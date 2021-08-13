import {
  Controller,
  Request,
  Post,
  Body,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth-guard';
import { AuthService } from './auth/auth.service';
import { LoginUserDto } from './users/dtos';
import { Public } from './common/decorators/public-route.decorator';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() loginData: LoginUserDto, @Request() req) {
    return this.authService.login(req.user, loginData.rememberMe);
  }
}
