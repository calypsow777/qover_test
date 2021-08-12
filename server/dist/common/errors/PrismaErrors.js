"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomPrismaClientKnownRequestError = void 0;
class CustomPrismaClientKnownRequestError {
    constructor(error) {
        this.code = error.code;
        this.meta = error.meta ? Object.assign({}, error.meta) : null;
        this.message = error.message;
    }
}
exports.CustomPrismaClientKnownRequestError = CustomPrismaClientKnownRequestError;
//# sourceMappingURL=PrismaErrors.js.map