import ProductoDAO from "../daos/products.dao";

export default class ProductService {
  constructor() {
    this.ProductDAO = new Product();
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

  async getProductById() {
    try {
      const product = await this.ProductDAO.getProductById();
      if (!product) {
        throw new Error("Producto no encontrado");
      }
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
      throw new Error("Hubo un error al intentar agregar el producto");
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
