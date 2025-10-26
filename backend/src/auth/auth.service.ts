import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const payloadUrl = process.env.PAYLOAD_URL || 'http://cms:3002';
    
    try {
      // Check if user exists
      const existingUserResponse = await fetch(
        `${payloadUrl}/api/users?where[email][equals]=${registerDto.email}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      const existingUsers = await existingUserResponse.json();
      
      if (existingUsers.docs && existingUsers.docs.length > 0) {
        throw new ConflictException('User with this email already exists');
      }

      // Create user in Payload CMS
      const response = await fetch(`${payloadUrl}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: registerDto.email,
          password: registerDto.password,
          name: registerDto.name,
          role: registerDto.role || 'student',
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new ConflictException(error.message || 'Failed to create user');
      }

      const user = await response.json();

      // Generate JWT token
      const token = this.generateToken(user.doc);

      return {
        user: {
          id: user.doc.id,
          email: user.doc.email,
          name: user.doc.name,
          role: user.doc.role,
        },
        token,
      };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      console.error('Registration error:', error);
      throw new ConflictException('Failed to register user');
    }
  }

  async login(loginDto: LoginDto) {
    const payloadUrl = process.env.PAYLOAD_URL || 'http://cms:3002';

    console.log('Login request to:', `${payloadUrl}/api/users/login`);
    console.log('Login payload:', {
      email: loginDto.email,
      password: loginDto.password,
    });
    try {
      // Use Payload CMS login endpoint
      const response = await fetch(`${payloadUrl}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: loginDto.email,
          password: loginDto.password,
        }),
      });

      if (!response.ok) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const data = await response.json();

      // Generate our own JWT token
      const token = this.generateToken(data.user);

      return {
        user: {
          id: data.user.id,
          email: data.user.email,
          name: data.user.name,
          role: data.user.role,
        },
        token,
        payloadToken: data.token,
      };
    } catch (error) {
      console.error('Login error:', error);
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async validateUser(userId: string) {
    const payloadUrl = process.env.PAYLOAD_URL || 'http://cms:3002';

    try {
      const response = await fetch(`${payloadUrl}/api/users/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        return null;
      }

      const user = await response.json();
      return user;
    } catch (error) {
      console.error('Validate user error:', error);
      return null;
    }
  }

  private generateToken(user: any) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return this.jwtService.sign(payload);
  }

  async verifyToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.validateUser(payload.sub);
      
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return user;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
