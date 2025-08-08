import { Injectable } from '@nestjs/common';

export interface EconomicIndicators {
  inflation: number;
  unemployment: number;
  gdpGrowth: number;
  publicSentiment: number;
}

export interface GameState {
  sessionId: string;
  currentRound: number;
  totalRounds: number;
  timeRemaining: string;
  scenarioTitle: string;
  scenarioDescription: string;
  playerRole: string;
  indicators: EconomicIndicators;
  players: Player[];
  availableActions: GameAction[];
  actionHistory: ActionHistory[];
  successCriteria: SuccessCriterion[];
}

export interface Player {
  id: string;
  username: string;
  role: string;
  roleIcon: string;
  isOnline: boolean;
}

export interface GameAction {
  id: string;
  title: string;
  description: string;
  cost: string;
  timeToEffect: string;
  impact: string;
  mmtView: 'recommended' | 'neutral' | 'cautious';
  traditionalView: 'recommended' | 'neutral' | 'cautious';
}

export interface ActionHistory {
  actionTitle: string;
  playerName: string;
  playerRole: string;
  round: number;
  timestamp: Date;
}

export interface SuccessCriterion {
  description: string;
  target: number;
  current: number;
  achieved: boolean;
}

@Injectable()
export class GameStateService {
  private gameSessions = new Map<string, GameState>();
  private playerSessions = new Map<string, string>(); // playerId -> sessionId

  createGameSession(sessionId: string, scenarioId: string = 'inflation-crisis'): GameState {
    const gameState: GameState = {
      sessionId,
      currentRound: 1,
      totalRounds: 6,
      timeRemaining: '24:00',
      scenarioTitle: 'Inflation Crisis Response',
      scenarioDescription: 'Navigate rising inflation while maintaining economic stability.',
      playerRole: 'Minister of Finance',
      indicators: {
        inflation: 7.2,
        unemployment: 6.8,
        gdpGrowth: 2.1,
        publicSentiment: 52
      },
      players: [
        {
          id: 'player1',
          username: 'EcoPlayer23',
          role: 'Central Bank Governor',
          roleIcon: '🏦',
          isOnline: true
        },
        {
          id: 'player2',
          username: 'PolicyCritic',
          role: 'Opposition Leader',
          roleIcon: '⚖️',
          isOnline: true
        },
        {
          id: 'player3',
          username: 'NewsHound',
          role: 'Media Representative',
          roleIcon: '📺',
          isOnline: true
        }
      ],
      availableActions: [
        {
          id: 'tax-cuts',
          title: 'Implement Targeted Tax Cuts',
          description: 'Reduce taxes on essential goods to help consumers cope with rising prices.',
          cost: '$15B',
          timeToEffect: 'Immediate',
          impact: 'Consumer relief',
          mmtView: 'recommended',
          traditionalView: 'cautious'
        },
        {
          id: 'coordinate-cb',
          title: 'Coordinate with Central Bank',
          description: 'Work with the Central Bank to develop a coordinated monetary-fiscal response.',
          cost: 'No direct cost',
          timeToEffect: 'Next round',
          impact: 'Policy coordination',
          mmtView: 'neutral',
          traditionalView: 'recommended'
        },
        {
          id: 'infrastructure-spending',
          title: 'Emergency Infrastructure Spending',
          description: 'Launch immediate infrastructure projects to stimulate demand and employment.',
          cost: '$25B',
          timeToEffect: '2 rounds',
          impact: 'Job creation',
          mmtView: 'recommended',
          traditionalView: 'cautious'
        }
      ],
      actionHistory: [
        {
          actionTitle: 'Central Bank raised rates to 4.5%',
          playerName: 'EcoPlayer23',
          playerRole: 'Central Bank Governor',
          round: 2,
          timestamp: new Date(Date.now() - 3600000)
        },
        {
          actionTitle: 'Emergency infrastructure spending approved',
          playerName: 'Current Player',
          playerRole: 'Minister of Finance',
          round: 2,
          timestamp: new Date(Date.now() - 7200000)
        },
        {
          actionTitle: 'Opposition called for budget cuts',
          playerName: 'PolicyCritic',
          playerRole: 'Opposition Leader',
          round: 1,
          timestamp: new Date(Date.now() - 10800000)
        }
      ],
      successCriteria: [
        {
          description: 'Keep inflation under 5%',
          target: 5,
          current: 7.2,
          achieved: false
        },
        {
          description: 'Maintain employment > 94%',
          target: 94,
          current: 93.2,
          achieved: false
        },
        {
          description: 'Public confidence > 60%',
          target: 60,
          current: 52,
          achieved: false
        }
      ]
    };

    this.gameSessions.set(sessionId, gameState);
    return gameState;
  }

  getGameSession(sessionId: string): GameState | undefined {
    return this.gameSessions.get(sessionId);
  }

  joinSession(playerId: string, sessionId: string): boolean {
    const session = this.gameSessions.get(sessionId);
    if (!session) {
      return false;
    }

    this.playerSessions.set(playerId, sessionId);
    return true;
  }

  leaveSession(playerId: string): void {
    this.playerSessions.delete(playerId);
  }

  getPlayerSession(playerId: string): string | undefined {
    return this.playerSessions.get(playerId);
  }

  executeAction(sessionId: string, playerId: string, actionId: string): GameState | null {
    const session = this.gameSessions.get(sessionId);
    if (!session) {
      return null;
    }

    const action = session.availableActions.find(a => a.id === actionId);
    if (!action) {
      return null;
    }

    // Add to action history
    session.actionHistory.unshift({
      actionTitle: action.title,
      playerName: 'Current Player', // In real implementation, get from user database
      playerRole: session.playerRole,
      round: session.currentRound,
      timestamp: new Date()
    });

    // Update economic indicators based on action
    this.updateEconomicIndicators(session, actionId);

    // Update success criteria
    this.updateSuccessCriteria(session);

    return session;
  }

  private updateEconomicIndicators(session: GameState, actionId: string): void {
    switch (actionId) {
      case 'tax-cuts':
        session.indicators.inflation -= 0.3;
        session.indicators.publicSentiment += 5;
        session.indicators.gdpGrowth += 0.2;
        break;
      case 'coordinate-cb':
        session.indicators.inflation -= 0.5;
        session.indicators.publicSentiment += 2;
        break;
      case 'infrastructure-spending':
        session.indicators.unemployment -= 0.4;
        session.indicators.gdpGrowth += 0.4;
        session.indicators.publicSentiment += 3;
        session.indicators.inflation += 0.2; // Some inflationary pressure
        break;
    }

    // Ensure values stay within reasonable bounds
    session.indicators.inflation = Math.max(0, Math.min(15, session.indicators.inflation));
    session.indicators.unemployment = Math.max(0, Math.min(20, session.indicators.unemployment));
    session.indicators.gdpGrowth = Math.max(-5, Math.min(8, session.indicators.gdpGrowth));
    session.indicators.publicSentiment = Math.max(0, Math.min(100, session.indicators.publicSentiment));
  }

  private updateSuccessCriteria(session: GameState): void {
    session.successCriteria[0].current = session.indicators.inflation;
    session.successCriteria[0].achieved = session.indicators.inflation < session.successCriteria[0].target;

    session.successCriteria[1].current = 100 - session.indicators.unemployment;
    session.successCriteria[1].achieved = (100 - session.indicators.unemployment) > session.successCriteria[1].target;

    session.successCriteria[2].current = session.indicators.publicSentiment;
    session.successCriteria[2].achieved = session.indicators.publicSentiment > session.successCriteria[2].target;
  }

  advanceRound(sessionId: string): GameState | null {
    const session = this.gameSessions.get(sessionId);
    if (!session || session.currentRound >= session.totalRounds) {
      return null;
    }

    session.currentRound += 1;
    session.timeRemaining = '24:00';

    // Add some random events or market dynamics
    this.simulateMarketDynamics(session);

    return session;
  }

  private simulateMarketDynamics(session: GameState): void {
    // Simulate some background economic changes
    const randomChange = (Math.random() - 0.5) * 0.5; // Random change between -0.25 and 0.25
    session.indicators.inflation += randomChange;
    session.indicators.gdpGrowth += randomChange * 0.5;
    
    // Ensure bounds
    session.indicators.inflation = Math.max(0, Math.min(15, session.indicators.inflation));
    session.indicators.gdpGrowth = Math.max(-5, Math.min(8, session.indicators.gdpGrowth));

    this.updateSuccessCriteria(session);
  }

  getAllSessions(): string[] {
    return Array.from(this.gameSessions.keys());
  }

  deleteSession(sessionId: string): void {
    this.gameSessions.delete(sessionId);
  }
}
