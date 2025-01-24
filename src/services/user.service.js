import UserDAO from "../daos/user.dao.js";

export default class UserService {
  constructor() {
    this.UserDAO = new UserDAO();
  }

  async createUser(user) {
    try {
      const newUser = await this.UserDAO.addUser(user);
      return newUser;
    } catch (error) {
      throw new Error("Hubo un error al intentar crear el usuario");
    }
  }

  async getUserByEmail(email) {
    try {
      const user = await this.UserDAO.getByEmail(email);
      return user;
    } catch (error) {
      throw new Error("Hubo un error al intentar obtener el usuario");
    }
  }
  async deleteUser(id) {
    try {
      const deletedUser = await this.UserDAO.deleteUser(id);
      return deletedUser;
    } catch (error) {
      throw new Error("Hubo un error al intentar eliminar el usuario");
    }
  }

  async updateUser(id, user) {
    try {
      const updatedUser = await this.UserDAO.updateUser(id, user);
      return updatedUser;
    } catch (error) {
      throw new Error("Hubo un error al intentar actualizar el usuario");
    }
  }

  async getUserById(id) {
    try {
      const user = await this.UserDAO.getById(id);
      return user;
    } catch (error) {
      throw new Error("Hubo un error al intentar obtener el usuario");
    }
  }

  async getUsers() {
    try {
      const users = await this.UserDAO.getAllUsers();
      return users;
    } catch (error) {
      throw new Error("Hubo un error al intentar obtener los usuarios");
    }
  }
}
