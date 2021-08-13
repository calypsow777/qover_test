import { Controller, Post, Body, UseFilters } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignupUserDto, UserWithoutPwdDto } from './dtos';
import { UsersExceptionsFilter } from './users-exceptions.filter';
import { Public } from 'src/common/decorators/public-route.decorator';

@Controller('users')
@UseFilters(UsersExceptionsFilter)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Public()
  @Post('user')
  async signupUser(
    @Body() userData: SignupUserDto,
  ): Promise<UserWithoutPwdDto> {
    const user = await this.userService.createUser(userData);
    delete user.password;
    return user;
  }
}
