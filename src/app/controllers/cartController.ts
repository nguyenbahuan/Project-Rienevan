import { Request, Response, NextFunction } from "express";
import MysqlDataSource from "../../config/db";
import { Bills } from "../models/bills.entity";
import { DetailsProduct } from "../models/detail_productsordered.entity";
import { Products } from "../models/products.entity";

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
    bill
      .save()
      .then(() => {})
      .catch(next);

    const queryResult = await billReRepository
      .createQueryBuilder("bill")
      .select("MAX(bill.id)", "maxId")
      .getRawOne();
    const maxId = queryResult.maxId;

    // res.json(maxId);

    let a = req.body.IdProduct;

    for (let i = 0; i < a.length; i++) {
      const detailProduct = await new DetailsProduct();
      const product = await new Products();
      bill.id = maxId + 1;
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
export default new cartController();
