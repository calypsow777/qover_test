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
exports.userWithoutPwdDto = exports.signupUserDto = void 0;
const class_validator_1 = require("class-validator");
const CustomError_1 = require("../common/errors/CustomError");
class signupUserDto {
}
__decorate([
    class_validator_1.IsEmail({}, {
        context: {
            customError: new CustomError_1.CustomError('users-1', 'The email must be valid.'),
        },
    }),
    __metadata("design:type", String)
], signupUserDto.prototype, "email", void 0);
__decorate([
    class_validator_1.IsString({
        context: {
            customError: new CustomError_1.CustomError('users-2', 'The password must be a string.'),
        },
    }),
    __metadata("design:type", String)
], signupUserDto.prototype, "password", void 0);
exports.signupUserDto = signupUserDto;
class userWithoutPwdDto {
}
exports.userWithoutPwdDto = userWithoutPwdDto;
//# sourceMappingURL=dtos.js.map