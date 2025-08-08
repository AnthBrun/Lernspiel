// src/content/content.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Content } from './entities/content.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Content)
    private contentRepo: Repository<Content>,
  ) {}

  async findAll(): Promise<Content[]> {
    return this.contentRepo.find();
  }

  async findByType(type: string): Promise<Content[]> {
    return this.contentRepo.find({ where: { type } });
  }
}
