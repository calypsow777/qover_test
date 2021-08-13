import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserWithoutPwdDto } from 'src/users/dtos';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user) {
      const pwdIsValid = await bcrypt.compare(password, user.password);
      if (pwdIsValid) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(user: UserWithoutPwdDto, rememberMe = false) {
    const payload = { email: user.email, sub: user.id };
    const options = rememberMe ? { expiresIn: '7d' } : {};
    return {
      access_token: this.jwtService.sign(payload, options),
    };
  }
}
