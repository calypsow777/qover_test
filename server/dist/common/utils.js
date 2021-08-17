"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwExceptionFromValidationErrors = exports.roundToTwoDecimalPlaces = void 0;
const CustomHttpException_1 = require("./errors/CustomHttpException");
function roundToTwoDecimalPlaces(num) {
    return Math.round((num + Number.EPSILON) * 100) / 100;
}
exports.roundToTwoDecimalPlaces = roundToTwoDecimalPlaces;
function throwExceptionFromValidationErrors(errors) {
    const resErrors = [];
    for (const error of errors) {
        const contexts = error.contexts;
        for (const contextKey in contexts) {
            resErrors.push(contexts[contextKey].customError);
        }
    }
    throw new CustomHttpException_1.CustomHttpException({
        customErrors: resErrors,
    });
}
exports.throwExceptionFromValidationErrors = throwExceptionFromValidationErrors;
//# sourceMappingURL=utils.js.map