import CartService from "../services/carts.service.js";
import ProductService from "../services/products.service.js";
import UserService from "../services/user.service.js";

const cartService = new CartService();
const productService = new ProductService();
const userService = new UserService();

export const createCart = async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) {
      return res.sendBadRequest("El ID del usuario es requerido");
    }

    const user = await userService.getUserById(userId);
    if (!user) {
      return res.sendBadRequest("Usuario no encontrado");
    }

    if (user.assignedCart) {
      return res.sendSuccess({
        message: "El usuario ya tiene un carrito asignado",
        cartId: user.assignedCart,
      });
    }

    const cart = await cartService.createCart({});
    await userService.updateUser(userId, { assignedCart: cart._id });
    res.cookie("user", JSON.stringify(user), { httpOnly: true, secure: true });
    res.sendCreated(cart, "Carrito creado y asignado correctamente");
  } catch (error) {
    res.sendServerError(error);
  }
};
export const deleteCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    if (!cartId) {
      return res.sendBadRequest("El ID del carrito es requerido");
    }

    const deletedCart = await cartService.deleteCart(cartId);
    res.sendSuccess(deletedCart, "Carrito eliminado correctamente");
  } catch (error) {
    res.sendServerError(error.message);
  }
};
export const addProductToCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    const user = await userService.getUserById(req.user._id);
    console.log(user);
    const cartId = user.assignedCart;
    if (!cartId) {
      return res.sendBadRequest("El usuario no tiene un carrito asignado");
    }
    if (!cartId || !productId) {
      return res.sendBadRequest(
        "El ID del carrito y del producto son requeridos"
      );
    }

    const product = await productService.getProductById(productId);
    if (!product) {
      return res.sendNotFound(`Producto con ID ${productId} no encontrado`);
    }

    const updatedCart = await cartService.addProductToCart(
      cartId,
      productId,
      quantity || 1
    );
    res.sendSuccess(updatedCart, "Producto añadido al carrito correctamente");
  } catch (error) {
    res.sendServerError(error.message);
  }
};
export const emptyCart = async (req, res) => {
  try {
    const user = await userService.getUserById(req.user._id);
    if (!user) {
      return res.sendNotFound("Usuario no encontrado");
    }

    const cartId = user.assignedCart;
    if (!cartId) {
      return res.sendBadRequest("El usuario no tiene un carrito asignado");
    }

    const emptyCart = await cartService.emptyCart(cartId);
    res.sendSuccess(emptyCart, "Carrito vaciado correctamente");
  } catch (error) {
    res.sendServerError(error);
  }
};
export const getCartById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.sendBadRequest("El ID del carrito es requerido");
    }

    const cart = await cartService.getCartById(id);
    res.sendSuccess(cart, "Carrito encontrado");
  } catch (error) {
    res.sendServerError(error);
  }
};
