const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({

title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  oldPrice: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
  },
  image: {
    type: String,
    required:true,
  },
  inStock:{
    type: Number,
    default: true,
  },
  ratecount:{
    type: Number,
    default: 0,
  }
 
});

const ProductModel = mongoose.model("Product", ProductSchema);

module.exports = { ProductModel };
