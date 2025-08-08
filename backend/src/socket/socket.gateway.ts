// src/socket/socket.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GameStateService } from '../game/game-state.service';

@WebSocketGateway({ 
  cors: {
    origin: ["http://localhost:3001", "http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
  }
})
export class SocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(private gameStateService: GameStateService) {}

  handleConnection(client: Socket) {
    console.log(`🔌 Client connected: ${client.id}`);
    client.emit('connected', { clientId: client.id });
  }

  handleDisconnect(client: Socket) {
    console.log(`❌ Client disconnected: ${client.id}`);
    // Clean up player session
    this.gameStateService.leaveSession(client.id);
  }

  @SubscribeMessage('ping')
  handlePing(@ConnectedSocket() client: Socket): void {
    console.log(`📡 Ping received from ${client.id}`);
    client.emit('pong', { timestamp: new Date().toISOString() });
  }

  @SubscribeMessage('joinGame')
  handleJoinGame(
    @MessageBody() data: { sessionId?: string },
    @ConnectedSocket() client: Socket,
  ): void {
    let sessionId = data.sessionId;
    
    // If no sessionId provided, create a new session
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      console.log(`🆕 Creating new game session: ${sessionId}`);
    }

    // Get or create game session
    let gameState = this.gameStateService.getGameSession(sessionId);
    if (!gameState) {
      gameState = this.gameStateService.createGameSession(sessionId);
      console.log(`🎮 New game session created: ${sessionId}`);
    }

    // Join player to session
    const joined = this.gameStateService.joinSession(client.id, sessionId);
    if (joined) {
      client.join(sessionId);
      console.log(`👤 Player ${client.id} joined session ${sessionId}`);
      
      // Send game state to the player
      client.emit('gameStateUpdate', gameState);
      
      // Notify other players in the session
      client.to(sessionId).emit('playerJoined', {
        playerId: client.id,
        timestamp: new Date().toISOString()
      });
    } else {
      client.emit('error', { message: 'Could not join game session' });
    }
  }

  @SubscribeMessage('playerAction')
  handlePlayerAction(
    @MessageBody() data: { actionId: string; playerId: string },
    @ConnectedSocket() client: Socket,
  ): void {
    const sessionId = this.gameStateService.getPlayerSession(client.id);
    if (!sessionId) {
      client.emit('error', { message: 'Not in a game session' });
      return;
    }

    console.log(`🎯 Player action: ${data.actionId} in session ${sessionId}`);

    // Execute the action
    const updatedGameState = this.gameStateService.executeAction(
      sessionId,
      client.id,
      data.actionId
    );

    if (updatedGameState) {
      // Broadcast updated game state to all players in the session
      this.server.to(sessionId).emit('gameStateUpdate', updatedGameState);
      
      // Send action confirmation to the acting player
      client.emit('actionExecuted', {
        actionId: data.actionId,
        success: true,
        timestamp: new Date().toISOString()
      });

      console.log(`✅ Action ${data.actionId} executed successfully`);
    } else {
      client.emit('error', { message: 'Could not execute action' });
    }
  }

  @SubscribeMessage('leaveGame')
  handleLeaveGame(@ConnectedSocket() client: Socket): void {
    const sessionId = this.gameStateService.getPlayerSession(client.id);
    if (sessionId) {
      client.leave(sessionId);
      this.gameStateService.leaveSession(client.id);
      
      // Notify other players
      client.to(sessionId).emit('playerLeft', {
        playerId: client.id,
        timestamp: new Date().toISOString()
      });

      console.log(`👋 Player ${client.id} left session ${sessionId}`);
    }
    
    client.emit('leftGame', { success: true });
  }

  @SubscribeMessage('requestGameState')
  handleRequestGameState(@ConnectedSocket() client: Socket): void {
    const sessionId = this.gameStateService.getPlayerSession(client.id);
    if (sessionId) {
      const gameState = this.gameStateService.getGameSession(sessionId);
      if (gameState) {
        client.emit('gameStateUpdate', gameState);
      }
    } else {
      client.emit('error', { message: 'Not in a game session' });
    }
  }

  @SubscribeMessage('advanceRound')
  handleAdvanceRound(@ConnectedSocket() client: Socket): void {
    const sessionId = this.gameStateService.getPlayerSession(client.id);
    if (!sessionId) {
      client.emit('error', { message: 'Not in a game session' });
      return;
    }

    const updatedGameState = this.gameStateService.advanceRound(sessionId);
    if (updatedGameState) {
      // Broadcast to all players in the session
      this.server.to(sessionId).emit('gameStateUpdate', updatedGameState);
      this.server.to(sessionId).emit('roundAdvanced', {
        newRound: updatedGameState.currentRound,
        timestamp: new Date().toISOString()
      });

      console.log(`📈 Advanced to round ${updatedGameState.currentRound} in session ${sessionId}`);
    } else {
      client.emit('error', { message: 'Could not advance round' });
    }
  }

  // Admin/Debug endpoints
  @SubscribeMessage('listSessions')
  handleListSessions(@ConnectedSocket() client: Socket): void {
    const sessions = this.gameStateService.getAllSessions();
    client.emit('sessionsList', { sessions, count: sessions.length });
  }

  // Method to simulate time progression
  startGameTimer(sessionId: string): void {
    const gameState = this.gameStateService.getGameSession(sessionId);
    if (!gameState) return;

    let timeLeft = 24 * 60; // 24 minutes in seconds

    const timer = setInterval(() => {
      timeLeft -= 1;
      
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;
      
      gameState.timeRemaining = timeString;

      // Broadcast time update
      this.server.to(sessionId).emit('timeUpdate', { 
        timeRemaining: timeString,
        secondsLeft: timeLeft 
      });

      // Auto-advance round when time runs out
      if (timeLeft <= 0) {
        clearInterval(timer);
        this.gameStateService.advanceRound(sessionId);
        const updatedState = this.gameStateService.getGameSession(sessionId);
        if (updatedState && updatedState.currentRound <= updatedState.totalRounds) {
          this.server.to(sessionId).emit('gameStateUpdate', updatedState);
          this.startGameTimer(sessionId); // Start timer for next round
        } else {
          // Game finished
          this.server.to(sessionId).emit('gameFinished', updatedState);
        }
      }
    }, 1000); // Update every second
  }
}
