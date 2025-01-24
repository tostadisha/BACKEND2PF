import TicketDAO from "../daos/tickets.dao.js";

export default class TicketService {
  constructor() {
    this.TicketDAO = new TicketDAO();
  }

  async createTicket(ticketData) {
    return await this.TicketDAO.createTicket(ticketData);
  }

  async getTicketById(id) {
    return await this.TicketDAO.getTicketById(id);
  }

  async deleteTicket(id) {
    return await this.TicketDAO.deleteTicket(id);
  }
}
