import { Controller, Post, Body, UseFilters, UsePipes } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignupDto, UserWithoutPwdDto } from './dtos';
import { UsersExceptionsFilter } from './users-exceptions.filter';
import { Public } from 'src/common/decorators/public-route.decorator';
import { SignupPipe } from './signup.pipe';

@Controller('users')
@UseFilters(UsersExceptionsFilter)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Public()
  @UsePipes(SignupPipe)
  @Post('user')
  async signupUser(@Body() userData: SignupDto): Promise<UserWithoutPwdDto> {
    const user = await this.userService.createUser(userData);
    delete user.password;
    return user;
  }
}
