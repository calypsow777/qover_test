import { Controller, Post, Body, UseFilters } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { signupUserDto, userWithoutPwdDto } from './dtos';
import { UsersExceptionsFilter } from './users-exceptions.filter';

@Controller('users')
@UseFilters(UsersExceptionsFilter)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('user')
  async signupUser(
    @Body() userData: signupUserDto,
  ): Promise<userWithoutPwdDto> {
    const user = await this.userService.createUser(userData);
    delete user.password;
    return user;
  }
}
