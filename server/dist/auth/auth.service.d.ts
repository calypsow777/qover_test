import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserWithoutPwdDto } from 'src/users/dtos';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<any>;
    login(user: UserWithoutPwdDto, rememberMe?: boolean): Promise<{
        access_token: string;
    }>;
}
