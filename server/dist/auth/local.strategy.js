"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStrategy = void 0;
const passport_local_1 = require("passport-local");
const passport_1 = require("@nestjs/passport");
const class_validator_1 = require("class-validator");
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const CustomHttpException_1 = require("../common/errors/CustomHttpException");
const CustomError_1 = require("../common/errors/CustomError");
const dtos_1 = require("./dtos");
const utils_1 = require("../common/utils");
let LocalStrategy = class LocalStrategy extends passport_1.PassportStrategy(passport_local_1.Strategy) {
    constructor(authService) {
        super({ usernameField: 'email' });
        this.authService = authService;
    }
    async validate(email, password) {
        const loginDto = new dtos_1.LoginDto();
        loginDto.email = email;
        loginDto.password = password;
        const errors = await class_validator_1.validate(loginDto, {
            stopAtFirstError: true,
        });
        if (errors.length > 0)
            utils_1.throwExceptionFromValidationErrors(errors);
        const { user, pwdIsWrong } = await this.authService.validateUser(email.toLowerCase(), password);
        if (!user) {
            throw new CustomHttpException_1.CustomHttpException({
                customErrors: [
                    new CustomError_1.CustomError('auth-3', 'This email is not registered yet.'),
                ],
            });
        }
        if (pwdIsWrong) {
            throw new CustomHttpException_1.CustomHttpException({
                customErrors: [new CustomError_1.CustomError('auth-4', 'The password is incorrect.')],
            });
        }
        return user;
    }
};
LocalStrategy = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], LocalStrategy);
exports.LocalStrategy = LocalStrategy;
//# sourceMappingURL=local.strategy.js.map