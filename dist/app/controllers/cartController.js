"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../../config/db"));
const bills_entity_1 = require("../models/bills.entity");
const detail_productsordered_entity_1 = require("../models/detail_productsordered.entity");
const products_entity_1 = require("../models/products.entity");
const billReRepository = db_1.default.getRepository(bills_entity_1.Bills);
const productDetailReRepository = db_1.default.getRepository(detail_productsordered_entity_1.DetailsProduct);
class cartController {
    async storeBill(req, res, next) {
        const bill = await new bills_entity_1.Bills();
        bill.fullname = req.body.fullName;
        bill.phone_number = req.body.phone;
        bill.total_money = req.body.total_money;
        bill.address = req.body.address;
        bill.status = "đang xử lý";
        bill.oder_date = new Date();
        bill.created_at = new Date();
        const saveBIlls = await billReRepository.save(bill);
        const billId = saveBIlls.id;
        // res.json(billId);
        let a = req.body.IdProduct;
        for (let i = 0; i < a.length; i++) {
            const detailProduct = await new detail_productsordered_entity_1.DetailsProduct();
            const product = await new products_entity_1.Products();
            bill.id = billId;
            detailProduct.bills = bill;
            product.id = req.body.IdProduct[i];
            detailProduct.product = product;
            detailProduct.amout = req.body.productAmount[i];
            detailProduct.size = req.body.productSize[i];
            detailProduct
                .save()
                .then(() => {
                res.redirect("cart/bill");
            })
                .catch(next);
        }
    }
}
exports.default = new cartController();
