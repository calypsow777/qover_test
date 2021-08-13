"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
const class_transformer_1 = require("class-transformer");
const Default = (defaultValue) => {
    return class_transformer_1.Transform((target) => target || defaultValue);
};
exports.Default = Default;
//# sourceMappingURL=custom-decorators.js.map