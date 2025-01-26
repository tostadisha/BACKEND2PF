import TicketService from "../services/tickets.service.js";
import UserService from "../services/user.service.js";
import CartService from "../services/carts.service.js";
import ProductService from "../services/products.service.js";
import { v4 as uuidv4 } from "uuid";
import { transport, config } from "../config/config.js";

const ticketService = new TicketService();
const userService = new UserService();
const cartService = new CartService();
const productService = new ProductService();

export const purchaseCart = async (req, res) => {
  try {
    const user = await userService.getUserByEmail(req.user.email, false);
    if (!user) {
      return res.sendNotFound("Usuario no encontrado.");
    }

    const cartId = user.assignedCart;
    if (!cartId) {
      return res.sendBadRequest("El usuario no tiene un carrito asignado.");
    }
    // Obtener el carrito
    const cart = await cartService.getCartById(cartId);
    console.log("El carrito");
    console.log(cart);
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
    const fecha = new Date();

    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, "0");
    const day = String(fecha.getDate()).padStart(2, "0");

    const hours = String(fecha.getHours()).padStart(2, "0");
    const minutes = String(fecha.getMinutes()).padStart(2, "0");
    const seconds = String(fecha.getSeconds()).padStart(2, "0");

    const formato = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    console.log(formato); // Ejemplo: 26/01/2025 14:35:09

    // Crear un ticket
    const ticket = await ticketService.createTicket({
      code: uuidv4(),
      purchase_datetime: formato,
      amount: totalAmount,
      purchaser: user.email,
    });
    console.log(ticket.amount);
    // Vaciar el carrito
    await cartService.emptyCart(cartId);
    const result = await transport.sendMail({
      from: config.email_mailing,
      to: user.email,
      subject: "Ticket de compra",
      html: `<h1>Ticket de compra</h1>
      <p>Código: ${ticket.code}</p>
      <p>Monto: $ ${ticket.amount} AR$</p>
      <p>Fecha: ${ticket.purchase_datetime}</p>,
      <p>Comprador:  ${ticket.purchaser}</p>`,
      attachments: [],
    });

    res.sendSuccess([
      {
        message: "Compra realizada con éxito.",
        ticket,
        productsNotProcessed,
        email: result,
      },
      "Se ha registrado el ticker",
    ]);
  } catch (error) {
    res.sendServerError(error.message);
  }
};
