import userModel from "../models/users.model.js";

export default class UserDAO {
  constructor() {}

  async getById(id) {
    try {
      return await userModel.findById(id);
    } catch (error) {
      throw new Error(`Error al obtener el usuario por ID: ${error.message}`);
    }
  }

  async getByEmail(email) {
    try {
      return await userModel.findOne({ email });
    } catch (error) {
      throw new Error(
        `Error al obtener el usuario por email: ${error.message}`
      );
    }
  }

  async getAllUsers() {
    try {
      return await userModel.find();
    } catch (error) {
      throw new Error(`Error al obtener todos los usuarios: ${error.message}`);
    }
  }

  async addUser(user) {
    try {
      return await userModel.create(user);
    } catch (error) {
      throw new Error(`Error al agregar el usuario: ${error.message}`);
    }
  }

  async updateUser(id, user) {
    try {
      return await userModel.findByIdAndUpdate(id, user, { new: true });
    } catch (error) {
      throw new Error(`Error al actualizar el usuario: ${error.message}`);
    }
  }

  async deleteUser(id) {
    try {
      return await userModel.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error al eliminar el usuario: ${error.message}`);
    }
  }
}
