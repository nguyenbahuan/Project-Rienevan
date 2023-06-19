"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../config/db"));
const bills_entity_1 = require("../models/bills.entity");
const detail_productsordered_entity_1 = require("../models/detail_productsordered.entity");
const billsRepository = db_1.default.getRepository(bills_entity_1.Bills);
const productDetailRepository = db_1.default.getRepository(detail_productsordered_entity_1.DetailsProduct);
class manageInvoiceController {
    async listBills(req, res, next) {
        const bills = await db_1.default.manager.find(bills_entity_1.Bills);
        res.render("admin/bills/table-bill", {
            title: "quản lý hóa đơn",
            layout: "admin",
            bills: bills,
        });
    }
    async billDetail(req, res, next) {
        let data = res.locals.data;
        const bill1 = await billsRepository
            .createQueryBuilder("bills")
            .where("bills.id = :id", {
            id: req.params.id,
        })
            .getOne();
        const bill2 = await productDetailRepository
            .createQueryBuilder("details_product")
            .leftJoinAndSelect("details_product.product", "products")
            .where("details_product.billsId = :billsId", { billsId: req.params.id })
            .getMany();
        data = {
            bills1: bill1,
            bills2: bill2,
        };
        // res.json(data.bills2);
        res.render("admin/bills/billDetail", {
            title: "billDetail",
            layout: "admin",
            data: data,
        });
    }
    async editBill(req, res, next) {
        const bill = await billsRepository
            .createQueryBuilder("bills")
            .where("bills.id = :id", {
            id: req.params.id,
        })
            .getOne();
        res.render("admin/bills/editBill", {
            title: "edit bill",
            layout: "admin",
            bill: bill,
        });
    }
    async updateBill(req, res, next) {
        // res.json(req.params.id);
        const updateBill = await billsRepository
            .createQueryBuilder()
            .update()
            .set({
            status: req.body.status,
        })
            .where("bills.id = :id", { id: req.params.id })
            .execute();
        res.redirect("/admin/table-bill");
    }
}
exports.default = new manageInvoiceController();
