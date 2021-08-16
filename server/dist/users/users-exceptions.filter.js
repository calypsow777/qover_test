"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const CustomError_1 = require("../common/errors/CustomError");
const CustomHttpException_1 = require("../common/errors/CustomHttpException");
const PrismaErrors_1 = require("../common/errors/PrismaErrors");
const all_exceptions_filter_1 = require("../common/exception-filters/all-exceptions.filter");
let UsersExceptionsFilter = class UsersExceptionsFilter extends all_exceptions_filter_1.AllExceptionsFilter {
    catch(e, host) {
        var _a, _b;
        if (e instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2002') {
                const customE = new PrismaErrors_1.CustomPrismaClientKnownRequestError(e);
                if ((_b = (_a = customE.meta) === null || _a === void 0 ? void 0 : _a.target) === null || _b === void 0 ? void 0 : _b.includes('email')) {
                    return super.catch(new CustomHttpException_1.CustomHttpException({
                        customErrors: [
                            new CustomError_1.CustomError('users-3', 'The email is already present in the database.'),
                        ],
                    }), host);
                }
            }
        }
        super.catch(e, host);
    }
};
UsersExceptionsFilter = __decorate([
    common_1.Catch()
], UsersExceptionsFilter);
exports.UsersExceptionsFilter = UsersExceptionsFilter;
//# sourceMappingURL=users-exceptions.filter.js.map