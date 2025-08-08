// src/socket/socket.module.ts
import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { GameModule } from '../game/game.module';

@Module({
  imports: [GameModule],
  providers: [SocketGateway],
  exports: [SocketGateway],
})
export class SocketModule {}
