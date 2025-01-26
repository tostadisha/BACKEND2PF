import ProductoDAO from "../daos/products.dao.js";

export default class ProductService {
  constructor() {
    this.ProductDAO = new ProductoDAO();
  }

  async getAllProducts() {
    try {
      const products = await this.ProductDAO.getAllProducts();
      return products;
    } catch (error) {
      console.error(error);
      throw new Error("Hubo un error al intentar conseguir los productos");
    }
  }

  async getProduct(input) {
    try {
      const product = await this.ProductDAO.getProduct(input);
      return product;
    } catch (error) {
      throw new Error("Hubo un error al intentar conseguir el producto");
    }
  }
  async getProductById(id) {
    try {
      const product = await this.ProductDAO.getById(id);
      return product;
    } catch (error) {
      throw new Error("Hubo un error al intentar conseguir el producto");
    }
  }

  async addProduct(product) {
    try {
      const newProduct = await this.ProductDAO.addProduct(product);
      return newProduct;
    } catch (error) {
      throw new Error("Hubo un error al intentar agregar el producto.");
    }
  }

  async updateProduct(id, product) {
    try {
      const updatedProduct = await this.ProductDAO.updateProduct(id, product);
      return updatedProduct;
    } catch (error) {
      throw new Error("Hubo un error al intentar actualizar el producto");
    }
  }
  async deleteProduct(id) {
    try {
      const deletedProduct = await this.ProductDAO.deleteProduct(id);
      return deletedProduct;
    } catch (error) {
      throw new Error("Hubo un error al intentar eliminar el producto");
    }
  }
}
