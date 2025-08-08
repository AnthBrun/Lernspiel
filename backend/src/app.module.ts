// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entities/user.entity';
import { GameModule } from './game/game.module';
import { ContentModule } from './content/content.module';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'serious_game',
      entities: [User],
      synchronize: true, // Achtung: true nur für Entwicklung!
    }),
    AuthModule,
    GameModule,
    ContentModule,
    SocketModule,
  ],
})
export class AppModule {}
