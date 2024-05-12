const express = require("express");
const { ProductModel } = require("../models/product.model");
const ProductRoute = express.Router();


ProductRoute.get("/", async (req, res) => {
  try {
    const {category} = req.query;
    console.log({category});
    let productList = [];
    if (category) {
    productList = await ProductModel.find({category})
    }
    else{
     productList = await ProductModel.find();
    }
    console.log({productList});
    res.status(200).json({  productList });
  } catch (error) {
    res.status(400).json({ error: "error" });
  }
});
ProductRoute.post("/", async (req, res) => {
  const data = req.body;
  console.log({ data });
  try {
    const productData = new ProductModel(data);
    // console.log({ productData });
    await productData.save();
    res.status(200).json({ message: "product added success" });
  } catch (error) {
    console.log({error});
    res.status(400).json({ error: "error" });
  }
});

module.exports = {ProductRoute};