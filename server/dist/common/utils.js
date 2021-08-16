"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roundToTwoDecimalPlaces = void 0;
function roundToTwoDecimalPlaces(num) {
    return Math.round((num + Number.EPSILON) * 100) / 100;
}
exports.roundToTwoDecimalPlaces = roundToTwoDecimalPlaces;
//# sourceMappingURL=utils.js.map