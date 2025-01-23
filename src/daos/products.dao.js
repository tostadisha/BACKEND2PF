import productModel from "../models/product.model.js";

export default class ProductDAO {
  constructor() {}

  getAllProducts = async () => {
    try {
      return await productModel.find();
    } catch (error) {
      throw new Error(`Error al obtener todos los productos: ${error.message}`);
    }
  };

  getByID = async (id) => {
    try {
      return await productModel.findById(id);
    } catch (error) {
      throw new Error(`Error al obtener el producto por ID: ${error.message}`);
    }
  };

  addProduct = async (product) => {
    try {
      return await productModel.create(product);
    } catch (error) {
      throw new Error(`Error al agregar el producto: ${error.message}`);
    }
  };

  updateProduct = async (id, product) => {
    try {
      return await productModel.findByIdAndUpdate(id, product, {
        new: true,
      });
    } catch (error) {
      throw new Error(`Error al actualizar el producto: ${error.message}`);
    }
  };

  deleteProduct = async (id) => {
    try {
      return await productModel.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error al eliminar el producto: ${error.message}`);
    }
  };
}
