import UserDAO from "../daos/user.dao.js";
import UserDTO from "../daos/DTOs/user.dto.js";

export default class UserService {
  constructor() {
    this.UserDAO = new UserDAO();
  }

  async createUser(user) {
    try {
      const exist = await this.UserDAO.getByEmail(user.email);
      if (exist) throw new Error("El usuario ya existe");
      const newUser = await this.UserDAO.addUser(user);
      return newUser;
    } catch (error) {
      throw new Error("Hubo un error al intentar crear el usuario");
    }
  }

  async getUserByEmail(email, DTO = true) {
    try {
      const user = await this.UserDAO.getByEmail(email);
      if (!user) throw new Error("Usuario no encontrado");
      if (DTO) {
        return new UserDTO(user);
      }
      return user;
    } catch (error) {
      throw new Error("Hubo un error al intentar obtener el usuario");
    }
  }

  async deleteUser(id) {
    try {
      const user = await this.UserDAO.getById(id);
      if (!user) throw new Error("Usuario no encontrado");
      const deletedUser = await this.UserDAO.deleteUser(id);
      return deletedUser;
    } catch (error) {
      throw new Error("Hubo un error al intentar eliminar el usuario");
    }
  }

  async updateUser(id, user) {
    try {
      const updatedUser = await this.UserDAO.updateUser(id, user);
      if (!updatedUser) throw new Error("Usuario no encontrado");
      return new UserDTO(updatedUser);
    } catch (error) {
      throw new Error("Hubo un error al intentar actualizar el usuario");
    }
  }

  async getUserById(id, DTO = true) {
    try {
      const user = await this.UserDAO.getById(id);
      if (!user) throw new Error("Usuario no encontrado");
      if (DTO) {
        return new UserDTO(user);
      }
      return user;
    } catch (error) {
      throw new Error("Hubo un error al intentar obtener el usuario");
    }
  }

  async getUsers() {
    try {
      const users = await this.UserDAO.getAllUsers();
      return users.map((user) => new UserDTO(user));
    } catch (error) {
      throw new Error("Hubo un error al intentar obtener los usuarios");
    }
  }
}
