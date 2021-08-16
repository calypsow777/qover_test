"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PricesModule = void 0;
const common_1 = require("@nestjs/common");
const prices_service_1 = require("./prices.service");
const prices_controller_1 = require("./prices.controller");
const prisma_module_1 = require("../prisma/prisma.module");
let PricesModule = class PricesModule {
};
PricesModule = __decorate([
    common_1.Module({
        providers: [prices_service_1.PricesService],
        controllers: [prices_controller_1.PricesController],
        imports: [prisma_module_1.PrismaModule],
    })
], PricesModule);
exports.PricesModule = PricesModule;
//# sourceMappingURL=prices.module.js.map