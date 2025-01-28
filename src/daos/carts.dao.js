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
  findById = async (id) => {
    try {
      return await cartsModel.findById(id).lean(false);
    } catch (error) {
      throw new Error(`Error al buscar el carrito: ${error.message}`);
    }
  };
  findByIdPopulated = async (id) => {
    try {
      const cartPopulated = await cartsModel
        .findById(id)
        .populate("products._id");
      return cartPopulated;
    } catch (error) {
      throw new Error(`Error al buscar el carrito: ${error.message}`);
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
}
