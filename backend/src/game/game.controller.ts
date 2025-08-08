// src/game/game.controller.ts
import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { GameService } from './game.service';

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
