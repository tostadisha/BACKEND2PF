import CartDAO from "../daos/carts.dao.js";
import mongoose from "mongoose";

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
    const cart = await this.CartDAO.findById(cartId);
    console.log(cart);
    const productIndex = cart.products.findIndex(
      (product) => product._id.toString() === productId
    );
    if (productIndex !== -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ _id: productId, quantity });
    }
    return await cart.save();
  }
  async getCartById(id) {
    try {
      const cart = await this.CartDAO.findById(id);
      return cart;
    } catch (error) {
      throw new Error("Hubo un error al intentar obtener el carrito");
    }
  }
}
