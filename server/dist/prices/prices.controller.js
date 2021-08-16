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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PricesController = void 0;
const common_1 = require("@nestjs/common");
const prices_service_1 = require("./prices.service");
const get_prices_pipe_1 = require("./get-prices.pipe");
const utils_1 = require("../common/utils");
let PricesController = class PricesController {
    constructor(pricesService) {
        this.pricesService = pricesService;
    }
    async getCarMakes() {
        return this.pricesService.getAllCarBrands();
    }
    async getPrices({ purchasePrice, price }) {
        const { globalYearlyPrice, universalYearlyPrice, universalYearlyMultiplier, } = price;
        return {
            global: {
                yearlyPrice: utils_1.roundToTwoDecimalPlaces(globalYearlyPrice),
            },
            universal: {
                yearlyPrice: utils_1.roundToTwoDecimalPlaces(universalYearlyPrice + universalYearlyMultiplier * purchasePrice),
            },
        };
    }
};
__decorate([
    common_1.Get('carMakes'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PricesController.prototype, "getCarMakes", null);
__decorate([
    common_1.Get(':driverAge/:carMake/:purchasePrice'),
    common_1.UsePipes(get_prices_pipe_1.GetPricesPipe),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PricesController.prototype, "getPrices", null);
PricesController = __decorate([
    common_1.Controller('prices'),
    __metadata("design:paramtypes", [prices_service_1.PricesService])
], PricesController);
exports.PricesController = PricesController;
//# sourceMappingURL=prices.controller.js.map