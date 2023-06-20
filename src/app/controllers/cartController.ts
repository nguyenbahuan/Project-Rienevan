import { Request, Response, NextFunction } from "express";
import MysqlDataSource from "../../config/db";
import { Bills } from "../models/bills.entity";
import { DetailsProduct } from "../models/detail_productsordered.entity";
import { Products } from "../models/products.entity";
import { max } from "class-validator";
import { join } from "path";

const billReRepository = MysqlDataSource.getRepository(Bills);
const productDetailReRepository = MysqlDataSource.getRepository(DetailsProduct);
class cartController {
  async storeBill(req: Request, res: Response, next: NextFunction) {
    const bill = await new Bills();
    bill.fullname = req.body.fullName;
    bill.phone_number = req.body.phone;
    bill.total_money = req.body.total_money;
    bill.address = req.body.address;
    bill.status = "đang xử lý";
    bill.oder_date = new Date();
    bill.created_at = new Date();

    const saveBIlls = await billReRepository.save(bill);

    const billId = saveBIlls.id;
    let a = req.body.IdProduct;

    if (typeof a == "string") {
      const detailProduct = await new DetailsProduct();
      const product = await new Products();
      bill.id = billId;
      detailProduct.bills = bill;
      product.id = req.body.IdProduct;
      detailProduct.product = product;
      detailProduct.amout = req.body.productAmount;
      detailProduct.size = req.body.productSize;
      detailProduct
        .save()
        .then(() => {
          res.redirect("cart/bill");
        })
        .catch(next);
    }

    if (typeof a == "object") {
      // res.json(typeof a);
      for (let i = 0; i < a.length; i++) {
        const detailProduct = await new DetailsProduct();
        const product = await new Products();
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
}
export default new cartController();
