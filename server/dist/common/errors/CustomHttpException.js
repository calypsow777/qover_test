"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomHttpException = void 0;
const common_1 = require("@nestjs/common");
class CustomHttpException extends common_1.HttpException {
    constructor({ statusCode = common_1.HttpStatus.BAD_REQUEST, message = 'The validation failed', customErrors, }) {
        super({
            statusCode,
            message,
            customErrors,
        }, statusCode);
    }
}
exports.CustomHttpException = CustomHttpException;
//# sourceMappingURL=CustomHttpException.js.map