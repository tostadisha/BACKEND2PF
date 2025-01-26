import UserDAO from "../daos/user.dao.js";
import UserDTO from "../daos/DTOs/user.dto.js";

export default class UserService {
  constructor() {
    this.UserDAO = new UserDAO();
  }

  // Crear usuario y devolverlo como DTO
  async createUser(user) {
    try {
      const newUser = await this.UserDAO.addUser(user);
      console.log(newUser);
      const userDTO = new UserDTO(newUser);
      console.log(userDTO);
      return userDTO;
    } catch (error) {
      throw new Error("Hubo un error al intentar crear el usuario");
    }
  }

  // Obtener usuario por email y devolverlo como DTO
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

  // Eliminar usuario (sin transformación, ya que no hay datos devueltos)
  async deleteUser(id) {
    try {
      const deletedUser = await this.UserDAO.deleteUser(id);
      return deletedUser;
    } catch (error) {
      throw new Error("Hubo un error al intentar eliminar el usuario");
    }
  }

  // Actualizar usuario y devolverlo como DTO
  async updateUser(id, user) {
    try {
      const updatedUser = await this.UserDAO.updateUser(id, user);
      if (!updatedUser) throw new Error("Usuario no encontrado");
      return new UserDTO(updatedUser);
    } catch (error) {
      throw new Error("Hubo un error al intentar actualizar el usuario");
    }
  }

  // Obtener usuario por ID y devolverlo como DTO
  async getUserById(id) {
    try {
      const user = await this.UserDAO.getById(id);
      if (!user) throw new Error("Usuario no encontrado");
      return new UserDTO(user);
    } catch (error) {
      throw new Error("Hubo un error al intentar obtener el usuario");
    }
  }

  // Obtener todos los usuarios y devolver una lista de DTOs
  async getUsers() {
    try {
      const users = await this.UserDAO.getAllUsers();
      return users.map((user) => new UserDTO(user));
    } catch (error) {
      throw new Error("Hubo un error al intentar obtener los usuarios");
    }
  }
}
