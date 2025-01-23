import CartDAO from "../daos/carts.dao.js";

export default class CartService {
  constructor() {
    this.CartDAO = new CartDAO();
  }

  async createCart(cart) {
    try {
      const newCart = await this.CartDAO.createCart(cart);
      return newCart;
    } catch (error) {
      throw new Error("Hubo un error al intentar crear el carrito");
    }
  }

  async deleteCart(id) {
    try {
      const deletedCart = await this.CartDAO.deleteCart(id);
      return deletedCart;
    } catch (error) {
      throw new Error("Hubo un error al intentar eliminar el carrito");
    }
  }

  async updateCart(id, cart) {
    try {
      const updatedCart = await this.CartDAO.updateCart(id, cart);
      return updatedCart;
    } catch (error) {
      throw new Error("Hubo un error al intentar actualizar el carrito");
    }
  }

  async addProductToCart(cartId, productId, quantity) {
    try {
      return await this.CartDAO.addProductToCart(cartId, productId, quantity);
    } catch (error) {
      throw new Error(
        "Hubo un error al intentar agregar el producto al carrito"
      );
    }
  }
}
