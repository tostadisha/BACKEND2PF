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
    res.cookie("proyectoCookie", token, { httpOnly: true }).sendSuccess(
      {
        user: `Sesión iniciada como ${user.email}`,
        role: user.role,
      },
      "Login correcto"
    );
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

export const logout = (_, res) => {
  res.clearCookie("proyectoCookie").sendSuccess({ message: "Logout correcto" });
};

export const current = (req, res) => {
  try {
    console.log(req.user);
    let user = req.user;
    if (!user) {
      return res.sendBadRequest("No hay una sesión activa");
    }
    res.sendSuccess({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      assignedCArt: user.assignedCart
        ? "Cart already assigned"
        : "Cart not assigned",
    });
  } catch (error) {
    res.sendServerError(error);
  }
};
