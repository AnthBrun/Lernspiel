// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async register(data: RegisterDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = this.userRepo.create({
      username: data.username,
      password: hashedPassword,
      role: data.role ?? 'player',
    });
    return this.userRepo.save(user);
  }

  async login(data: LoginDto) {
    const user = await this.userRepo.findOneBy({ username: data.username });
    if (!user) return null;

    const isMatch = await bcrypt.compare(data.password, user.password);
    return isMatch ? user : null;
  }
}
