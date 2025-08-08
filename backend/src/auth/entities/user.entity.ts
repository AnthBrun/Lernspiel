// src/auth/entities/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ default: 'player' }) // Rollen: z.B. player, teacher, admin
  role: string;

  @CreateDateColumn()
  createdAt: Date;
}
