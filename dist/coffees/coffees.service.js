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
exports.CoffeesService = void 0;
const common_1 = require("@nestjs/common");
let CoffeesService = class CoffeesService {
    constructor() {
        this.coffees = [
            {
                id: 1,
                name: 'Shipwreck Roast',
                brand: 'Buddy Brew',
                flavors: ['chocolate', 'vanilla'],
            },
        ];
    }
    findOne(id) {
        const coffee = this.coffees.find((item) => item.id === +id);
        if (!coffee) {
            throw new common_1.HttpException(`Coffee #${id} not found`, common_1.HttpStatus.NOT_FOUND);
        }
        return coffee;
    }
    findAll(paginationQuery) {
        const { limit, offset } = paginationQuery;
        console.log(`limit: ${limit}, offset: ${offset}`);
        return this.coffees;
    }
    create(createCoffeeDto) {
        this.coffees.push(createCoffeeDto);
        return createCoffeeDto;
    }
    update(id, updateCoffeeDto) {
        const existingCoffee = this.findOne(id);
        if (existingCoffee) {
            console.log(updateCoffeeDto);
        }
    }
    delete(id) {
        const coffeeIndex = this.coffees.findIndex((item) => item.id === +id);
        if (coffeeIndex >= 0) {
            this.coffees.splice(coffeeIndex, 1);
        }
    }
};
exports.CoffeesService = CoffeesService;
__decorate([
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CoffeesService.prototype, "findAll", null);
exports.CoffeesService = CoffeesService = __decorate([
    (0, common_1.Injectable)()
], CoffeesService);
//# sourceMappingURL=coffees.service.js.map