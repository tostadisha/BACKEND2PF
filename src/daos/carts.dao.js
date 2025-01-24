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
      const cartPopulated = await cartsModel
        .findById(id)
        .lean(false)
        .populate("products._id");
      // const cartModified = {
      //   _id: cartPopulated._id,
      //   products: cartPopulated.products.map((product) => {
      //     return {
      //       _id: product._id._id,
      //       name: product._id.name,
      //       price: product._id.price,
      //       quantity: product.quantity,
      //       stock: product._id.stock,
      //       category: product._id.category,
      //     };
      //   }),
      // };
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
  addProductToCart = async (cartId, productId, quantity) => {
    try {
      // Buscar el carrito usando findById directamente desde el modelo
      const cart = await cartsModel.findById(cartId);

      if (!cart) {
        throw new Error("Carrito no encontrado");
      }

      // Verificar si el producto ya está en el carrito
      const productIndex = cart.products.findIndex(
        (product) => product._id.toString() === productId
      );

      if (productIndex !== -1) {
        // Si el producto ya existe, incrementar la cantidad
        cart.products[productIndex].quantity += quantity;
      } else {
        // Si no existe, agregar un nuevo producto
        cart.products.push({ _id: productId, quantity });
      }

      // Guardar los cambios directamente en el documento original
      const updatedCart = await cart.save();

      // Devolver el carrito actualizado
      return updatedCart;
    } catch (error) {
      throw new Error(
        `Error al agregar el producto al carrito: ${error.message}`
      );
    }
  };
}
