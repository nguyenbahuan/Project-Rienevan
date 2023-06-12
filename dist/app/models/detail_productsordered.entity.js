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
exports.DetailsProduct = void 0;
const typeorm_1 = require("typeorm");
const products_entity_1 = require("./products.entity");
let DetailsProduct = class DetailsProduct extends typeorm_1.BaseEntity {
    id;
    amout;
    product;
    created_at;
    updated_at;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], DetailsProduct.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], DetailsProduct.prototype, "amout", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => products_entity_1.Products, (product) => product.details),
    __metadata("design:type", products_entity_1.Products)
], DetailsProduct.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], DetailsProduct.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], DetailsProduct.prototype, "updated_at", void 0);
DetailsProduct = __decorate([
    (0, typeorm_1.Entity)()
], DetailsProduct);
exports.DetailsProduct = DetailsProduct;
