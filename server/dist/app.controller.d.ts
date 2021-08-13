import { AuthService } from './auth/auth.service';
import { LoginUserDto } from './users/dtos';
export declare class AppController {
    private authService;
    constructor(authService: AuthService);
    login(loginData: LoginUserDto, req: any): Promise<{
        access_token: string;
    }>;
}
