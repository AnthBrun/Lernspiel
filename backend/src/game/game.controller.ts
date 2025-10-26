// src/game/game.controller.ts
import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { GameService } from './game.service';
import { EconomySystemService } from './entities/economy-system.service';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post('save')
  async saveGame(@Body() body: { userId: number; state: any }) {
    return this.gameService.saveGame(body.userId, body.state);
  }

  @Get('sessions')
  async getSessions(@Query('userId') userId: number) {
    return this.gameService.getSessions(Number(userId));
  }
}

@Controller('economy-systems')
export class EconomySystemController {
  constructor(private readonly economySystemService: EconomySystemService) {}

  @Get()
  async getAllSystems() {
    return this.economySystemService.getAllSystems();
  }

  @Get(':name')
  async getSystemByName(@Param('name') name: string) {
    return this.economySystemService.getSystemByName(name);
  }
}
