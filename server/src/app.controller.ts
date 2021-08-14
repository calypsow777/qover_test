import {
  Controller,
  Request,
  Post,
  Get,
  Body,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth-guard';
import { AuthService } from './auth/auth.service';
import { LoginDto, LoginResponseDto } from './auth/dtos';
import { Public } from './common/decorators/public-route.decorator';
import { UserWithoutPwdDto } from './users/dtos';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(
    @Body() loginData: LoginDto,
    @Request() req,
  ): Promise<LoginResponseDto> {
    return this.authService.login(req.user, loginData.rememberMe);
  }

  @Get('auth/verify')
  verify(@Request() req): UserWithoutPwdDto {
    return req.user;
  }
}
