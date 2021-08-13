import { UsersService } from '../users/users.service';
import { SignupUserDto, UserWithoutPwdDto } from './dtos';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    signupUser(userData: SignupUserDto): Promise<UserWithoutPwdDto>;
}
