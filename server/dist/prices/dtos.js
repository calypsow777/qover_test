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
exports.GetPricesDto = void 0;
const class_validator_1 = require("class-validator");
const CustomError_1 = require("../common/errors/CustomError");
class GetPricesDto {
    constructor({ driverAge, carMake, purchasePrice, }) {
        this.driverAge = driverAge;
        this.carMake = carMake;
        this.purchasePrice = purchasePrice;
    }
}
__decorate([
    class_validator_1.Max(120, {
        context: {
            customError: new CustomError_1.CustomError('prices-4', 'Sorry! The driver is too old.'),
        },
    }),
    class_validator_1.Min(18, {
        context: {
            customError: new CustomError_1.CustomError('prices-3', 'Sorry! The driver is too young.'),
        },
    }),
    class_validator_1.IsPositive({
        context: {
            customError: new CustomError_1.CustomError('prices-2', 'Please enter a valid age.'),
        },
    }),
    class_validator_1.IsInt({
        context: {
            customError: new CustomError_1.CustomError('prices-1', 'Please enter a valid age.'),
        },
    }),
    __metadata("design:type", Number)
], GetPricesDto.prototype, "driverAge", void 0);
__decorate([
    class_validator_1.IsNotEmpty({
        context: {
            customError: new CustomError_1.CustomError('prices-5', 'Please select a car make.'),
        },
    }),
    __metadata("design:type", String)
], GetPricesDto.prototype, "carMake", void 0);
__decorate([
    class_validator_1.Min(5000, {
        context: {
            customError: new CustomError_1.CustomError('prices-8', 'Sorry! The price of the car is too low.'),
        },
    }),
    class_validator_1.IsPositive({
        context: {
            customError: new CustomError_1.CustomError('prices-7', 'Please enter a valid purchase price.'),
        },
    }),
    class_validator_1.IsNumber({}, {
        context: {
            customError: new CustomError_1.CustomError('prices-6', 'Please enter a valid purchase price.'),
        },
    }),
    __metadata("design:type", Number)
], GetPricesDto.prototype, "purchasePrice", void 0);
exports.GetPricesDto = GetPricesDto;
//# sourceMappingURL=dtos.js.map