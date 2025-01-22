import productModel from "../models/product.model";

export default class Product {
  constructor() {}

  getAllProducts = async () => {
    return await productModel.find();
  };
  getByID = async () => {
    return await productModel.findById(id);
  };

  addProduct = async (product) => {
    return await productModel.create(product);
  };

  updateProduct = async (id, product) => {
    return await productModel.findByIdAndUpdate(id, product, {
      new: true,
    });
  };
  deleteProduct = async (id) => {
    return await productModel.findByIdAndDelete(id);
  };
}
