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
exports.GetPricesPipe = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const prices_service_1 = require("./prices.service");
const CustomError_1 = require("../common/errors/CustomError");
const CustomHttpException_1 = require("../common/errors/CustomHttpException");
const dtos_1 = require("./dtos");
let GetPricesPipe = class GetPricesPipe {
    constructor(pricesService) {
        this.pricesService = pricesService;
    }
    async transform(value) {
        const { driverAge, carMake, purchasePrice } = value;
        const numDriverAge = Number.parseInt(driverAge, 10);
        const numPurchasePrice = Number.parseInt(purchasePrice, 10);
        const errors = await class_validator_1.validate(new dtos_1.GetPricesDto({
            driverAge: numDriverAge,
            carMake,
            purchasePrice: numPurchasePrice,
        }), {
            stopAtFirstError: true,
        });
        if (errors.length > 0) {
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
        if (numDriverAge < 25 && carMake === 'Porsche') {
            throw new CustomHttpException_1.CustomHttpException({
                customErrors: [
                    new CustomError_1.CustomError('prices-9', 'Sorry! We cannot accept this particular risk.'),
                ],
            });
        }
        const price = await this.pricesService.findUnique({
            where: { carMake },
        });
        if (!price) {
            throw new CustomHttpException_1.CustomHttpException({
                customErrors: [
                    new CustomError_1.CustomError('prices-10', 'We do not cover this car make.'),
                ],
            });
        }
        return {
            driverAge: numDriverAge,
            carMake,
            purchasePrice: numPurchasePrice,
            price,
        };
    }
};
GetPricesPipe = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [prices_service_1.PricesService])
], GetPricesPipe);
exports.GetPricesPipe = GetPricesPipe;
//# sourceMappingURL=get-prices.pipe.js.map