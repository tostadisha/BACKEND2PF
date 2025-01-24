import { generateToken } from "../utils/generateToken.js";

export const login = async (req, res) => {
  try {
    let user = req.user;
    let cookieExist = req.cookies["proyectoCookie"];
    if (cookieExist) {
      return res.sendBadRequest("Ya existe una sesión activa");
    }
    if (!user) {
      return res.sendBadRequest("Credenciales inválidas");
    }
    const token = generateToken(user);
    res.cookie("proyectoCookie", token, { httpOnly: true }).sendSuccess({
      message: "Login correcto",
      user: `Sesión iniciada como ${user.email}`,
      role: user.role,
    });
  } catch (error) {
    res.sendServerError(error);
  }
};

export const register = async (req, res) => {
  try {
    let user = req.user;
    let cookieExist = req.cookies["proyectoCookie"];
    if (cookieExist) {
      return res.sendBadRequest("Ya existe una sesión activa");
    }
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
