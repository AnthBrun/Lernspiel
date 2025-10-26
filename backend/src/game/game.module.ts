// src/game/game.module.ts
import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { EconomySystemController, GameController } from './game.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from './entities/session.entity';
import { EconomySystemService } from './entities/economy-system.service';

@Module({
  imports: [TypeOrmModule.forFeature([Session])],
  providers: [GameService, EconomySystemService],
  controllers: [GameController, EconomySystemController],
  exports: [GameService, EconomySystemService],
})
export class GameModule {}
