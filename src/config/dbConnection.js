import mongoose from "mongoose";
import { config } from "./config.js";

export default class DbConnection {
  static #instance;
  constructor() {
    mongoose.connect(config.mongo_url);
  }

  static getInstance = () => {
    if (this.#instance) {
      console.log("Usted ya está conectado");
      return this.#instance;
    }
    this.#instance = new DbConnection();
    console.log("Conexión exitosa");
    return this.#instance;
  };
}
