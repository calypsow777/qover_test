import { UsersService } from '../users/users.service';
import { SignupDto, UserWithoutPwdDto } from './dtos';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    signupUser(userData: SignupDto): Promise<UserWithoutPwdDto>;
}
