import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import sql from "mssql";

var config = {
  user: "sa",
  password: "test123",
  server: "127.0.0.1",
  database: "HCMDRD",
  options: {
    trustedconnection: true,
    enableArithAbort: true,
    instancename: "SQLEXPRESS",
  },
  port: 55512,
};

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  res.json(products);
});
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});
const getSqlProduct = asyncHandler(async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let sql_product = await pool
      .request()
      .query("SELECT ID,ItemLookupCode,Price,Quantity,Description FROM Item ");
    if (sql_product.recordsets) {
      res.json(sql_product.recordsets[0]);
    }
  } catch (error) {
    console.log(error);
  }
});
const getSqlProductById = asyncHandler(async (req, res) => {
  try {
    let pool = await sql.connect(config);
    let single_product = await pool
      .request()
      .input("input_parameter", sql.Int, req.params.id)
      .query(
        "SELECT ID,ItemLookupCode,Price,Quantity,Description FROM Item where ID = @input_parameter"
      );
    if (single_product.recordsets) {
      res.json(single_product.recordset[0]);
    }
  } catch (error) {}
});
export { getProductById, getProducts, getSqlProduct, getSqlProductById };
