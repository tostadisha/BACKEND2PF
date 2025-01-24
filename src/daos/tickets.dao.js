import Ticket from "../models/ticket.model.js";

export default class TicketDAO {
  async createTicket(ticketData) {
    try {
      return await Ticket.create(ticketData);
    } catch (error) {
      throw new Error("Error al crear el ticket: " + error.message);
    }
  }

  async getTicketById(id) {
    try {
      return await Ticket.findById(id);
    } catch (error) {
      throw new Error("Error al obtener el ticket: " + error.message);
    }
  }

  async deleteTicket(id) {
    try {
      return await Ticket.findByIdAndDelete(id);
    } catch (error) {
      throw new Error("Error al eliminar el ticket: " + error.message);
    }
  }
}
