import TicketService from "../services/tickets.service.js";
import UserService from "../services/user.service.js";
import CartService from "../services/carts.service.js";
import ProductService from "../services/products.service.js";
import { v4 as uuidv4 } from "uuid";

const ticketService = new TicketService();
const userService = new UserService();
const cartService = new CartService();
const productService = new ProductService();

export const purchaseCart = async (req, res) => {
  try {
    console.log("Hola");
    const user = await userService.getUserByEmail(req.user.email);
    if (!user) {
      return res.sendNotFound("Usuario no encontrado.");
    }

    const cartId = user.assignedCart;
    if (!cartId) {
      return res.sendBadRequest("El usuario no tiene un carrito asignado.");
    }
    console.log("Paso 1");
    // Obtener el carrito
    const cart = await cartService.getCartById(cartId);
    if (!cart || cart.products.length === 0) {
      return res.sendBadRequest("El carrito está vacío o no existe.");
    }

    const productsNotProcessed = [];
    let totalAmount = 0;
    console.log("paso 2");
    // Procesar cada producto en el carrito
    for (const item of cart.products) {
      console.log();
      const product = await productService.getProductById(item._id._id);
      if (!product) {
        productsNotProcessed.push({
          name: product._id,
          reason: "Producto no encontrado",
        });
        continue;
      }

      if (product.stock < item.quantity) {
        productsNotProcessed.push({
          name: product.name,
          reason: "Stock insuficiente",
        });
        continue;
      }

      // Actualizar el stock del producto
      product.stock -= item.quantity;
      await product.save();

      // Calcular el monto total
      totalAmount += product.price * item.quantity;
    }
    console.log(totalAmount);
    // Crear un ticket
    const ticket = await ticketService.createTicket({
      code: uuidv4(),
      purchase_datetime: new Date(),
      amount: totalAmount,
      purchaser: user.email,
    });
    console.log(ticket.amount);
    // Vaciar el carrito
    await cartService.emptyCart(cartId);

    res.sendSuccess([
      { message: "Compra realizada con éxito.", ticket, productsNotProcessed },
      "Se ha registrado el ticker",
    ]);
  } catch (error) {
    res.sendServerError(error.message);
  }
};
