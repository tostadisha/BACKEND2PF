import { generateToken } from "../utils/generateToken.js";

export const login = async (req, res) => {
  try {
    let user = req.user;
    if (!user) {
      return res.sendBadRequest("Invalid credentials");
    }
    const token = generateToken(user);
    res
      .cookie("proyectoCookie", token, { httpOnly: true })
      .sendSuccess({ message: "Login correcto", token: token });
  } catch (error) {
    res.sendServerError(error);
  }
};

export const register = async (req, res) => {
  try {
    let user = req.user;
    if (!user) {
      return res.sendBadRequest("Credenciales inválidas");
    }
    const token = generateToken(user);
    res
      .cookie("proyectoCookie", token, { httpOnly: true })
      .sendSuccess({ message: "Registro correcto", token: token });
  } catch (error) {
    res.sendServerError(error);
  }
};

export const logout = (req, res) => {
  res.clearCookie("proyectoCookie").sendSuccess({ message: "Logout correcto" });
};
