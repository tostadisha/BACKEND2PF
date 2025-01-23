import CartService from "../services/carts.service.js";
import ProductService from "../services/products.service.js";

const cartService = new CartService();
const productService = new ProductService();

export const createCart = async (req, res) => {
  try {
    const cart = await cartService.createCart({});
    res.sendSuccess(cart);
  } catch (error) {
    res.sendServerError(error.message);
  }
};

export const deleteCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    if (!cartId) {
      return res.sendBadRequest("El ID del carrito es requerido");
    }

    const deletedCart = await cartService.deleteCart(cartId);
    res.sendSuccess(deletedCart);
  } catch (error) {
    res.sendServerError(error.message);
  }
};

export const addProductToCart = async (req, res) => {
  try {
    const { cartId, productId } = req.params;
    const { quantity } = req.body;

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
    res.sendSuccess(updatedCart);
  } catch (error) {
    res.sendServerError(error.message);
  }
};
