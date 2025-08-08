// src/content/content.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { ContentService } from './content.service';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get()
  findAll() {
    return this.contentService.findAll();
  }

  @Get('by-type')
  findByType(@Query('type') type: string) {
    return this.contentService.findByType(type);
  }
}
