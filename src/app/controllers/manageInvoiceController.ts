import { Request, Response, NextFunction } from "express";
import MysqlDataSource from "../../config/db";
import { Bills } from "../models/bills.entity";
import { DetailsProduct } from "../models/detail_productsordered.entity";
const billsRepository = MysqlDataSource.getRepository(Bills);
const productDetailRepository = MysqlDataSource.getRepository(DetailsProduct);

class manageInvoiceController {
  async listBills(req: Request, res: Response, next: NextFunction) {
    const bills = await MysqlDataSource.manager.find(Bills);
    res.render("admin/bills/table-bill", {
      title: "quản lý hóa đơn",
      layout: "admin",
      bills: bills,
    });
  }

  async billDetail(req: Request, res: Response, next: NextFunction) {
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

  async editBill(req: Request, res: Response, next: NextFunction) {
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

  async updateBill(req: Request, res: Response, next: NextFunction) {
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

export default new manageInvoiceController();
