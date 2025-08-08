// src/game/game.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from './entities/session.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Session)
    private sessionRepo: Repository<Session>,
  ) {}

  async saveGame(userId: number, state: any) {
    const session = this.sessionRepo.create({
      user: { id: userId } as any,
      state,
    });
    return this.sessionRepo.save(session);
  }

  async getSessions(userId: number) {
    return this.sessionRepo.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }
}
