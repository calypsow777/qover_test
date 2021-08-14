import { UserWithoutPwdDto } from 'src/users/dtos';
export declare class LoginDto {
    email: string;
    password: string;
    rememberMe: boolean;
}
export interface LoginResponseDto {
    accessToken: string;
    user: UserWithoutPwdDto;
}
