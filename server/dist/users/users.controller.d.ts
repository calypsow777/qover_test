import { UsersService } from '../users/users.service';
import { signupUserDto, userWithoutPwdDto } from './dtos';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    signupUser(userData: signupUserDto): Promise<userWithoutPwdDto>;
}
