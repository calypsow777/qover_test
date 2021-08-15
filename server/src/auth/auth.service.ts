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
    const user = await this.usersService.findUnique({ where: { email } });
    if (user) {
      const pwdIsValid = await bcrypt.compare(password, user.password);
      if (pwdIsValid) {
        const { password, ...result } = user;
        return { user: result, pwdIsWrong: false };
      }
      return { user, pwdIsWrong: true };
    }
    return { user: null };
  }

  async login(user: UserWithoutPwdDto, rememberMe = false) {
    const payload = { email: user.email, sub: user.id };
    const options = rememberMe ? { expiresIn: '7d' } : {};
    return {
      accessToken: this.jwtService.sign(payload, options),
      user,
    };
  }
}
