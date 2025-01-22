import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export const generateToken = (user) =>
  jwt.sign({ user }, config.secret_jwt, { expiresIn: "24H" });
