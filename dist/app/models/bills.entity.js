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
exports.Bills = void 0;
const typeorm_1 = require("typeorm");
const detail_productsordered_entity_1 = require("./detail_productsordered.entity");
const user_entity_1 = require("./user.entity");
let Bills = class Bills extends typeorm_1.BaseEntity {
    id;
    fullname;
    phone_number;
    address;
    status;
    oder_date;
    created_at;
    updated_at;
    details;
    user;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Bills.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Bills.prototype, "fullname", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Bills.prototype, "phone_number", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Bills.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Bills.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Bills.prototype, "oder_date", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Bills.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Bills.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => detail_productsordered_entity_1.DetailsProduct),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", detail_productsordered_entity_1.DetailsProduct)
], Bills.prototype, "details", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.bill),
    __metadata("design:type", Array)
], Bills.prototype, "user", void 0);
Bills = __decorate([
    (0, typeorm_1.Entity)()
], Bills);
exports.Bills = Bills;
