import cartsModel from "../models/carts.model.js";

export default class CartDAO {
  constructor() {}

  createCart = async (cart) => {
    try {
      return await cartsModel.create(cart);
    } catch (error) {
      throw new Error(`Error al crear el carrito: ${error.message}`);
    }
  };

  updateCart = async (id, cart) => {
    try {
      return await cartsModel.findByIdAndUpdate(id, cart, {
        new: true,
      });
    } catch (error) {
      throw new Error(`Error al actualizar el carrito: ${error.message}`);
    }
  };

  emptyCart = async (id) => {
    try {
      return await cartsModel.findByIdAndUpdate(
        id,
        { products: [] },
        { new: true }
      );
    } catch (error) {
      throw new Error(`Error al vaciar el carrito: ${error.message}`);
    }
  };

  deleteCart = async (id) => {
    try {
      return await cartsModel.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error al eliminar el carrito: ${error.message}`);
    }
  };

  addProductToCart = async (cartId, productId, quantity) => {
    try {
      const cart = await cartsModel.findById(cartId);
      if (!cart) {
        throw new Error("Carrito no encontrado");
      }

      const productIndex = cart.products.findIndex(
        (product) => product.id.toString() === productId
      );

      if (productIndex !== -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ id: productId, quantity });
      }

      return await cart.save();
    } catch (error) {
      throw new Error(
        `Error al agregar el producto al carrito: ${error.message}`
      );
    }
  };
}
