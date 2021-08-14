import { AuthService } from './auth/auth.service';
import { LoginDto, LoginResponseDto } from './auth/dtos';
import { UserWithoutPwdDto } from './users/dtos';
export declare class AppController {
    private authService;
    constructor(authService: AuthService);
    login(loginData: LoginDto, req: any): Promise<LoginResponseDto>;
    verify(req: any): UserWithoutPwdDto;
}
