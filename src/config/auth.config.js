import passport from "passport";
import local from "passport-local";
import jwt, { ExtractJwt } from "passport-jwt";
import UserService from "../services/user.service.js";
import { createHash, isValidPassword } from "../utils/hashingUtils.js";
import { config } from "./config.js";

const LocalStrategy = local.Strategy;
const JwtStrategy = jwt.Strategy;

const userService = new UserService();

const cookieExtractor = (req) => {
  return req && req.cookies ? req.cookies["proyectoCookie"] : null;
};

const initializePassport = () => {
  // Estrategia JWT
  passport.use(
    "jwt",
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: config.secret_jwt,
      },
      async (jwt_payload, done) => {
        try {
          return done(null, jwt_payload.user);
        } catch (error) {
          return done(null, false, { message: error.message });
        }
      }
    )
  );

  // Estrategia de registro
  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        const { firstName, lastName, role } = req.body;
        if (!firstName || !lastName || !role || !username || !password) {
          return done(null, false, { message: "Faltan datos" });
        }
        if (role !== "user" && role !== "admin") {
          return done(null, false, { message: "Rol inválido" });
        }
        try {
          const hashedPassword = await createHash(password);
          const user = await userService.createUser({
            firstName,
            lastName,
            role,
            email: username,
            password: hashedPassword,
          });
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  // Estrategia de login
  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
        passReqToCallback: true,
      },
      async (req, username, password, done) => {
        if (!username || !password) {
          return done(null, false, { message: "Faltan datos" });
        }
        try {
          const user = await userService.getUserByEmail(username, false);
          if (!user) {
            return done(null, false, { message: "Usuario no encontrado" });
          }
          const hashedPassword = user.password;
          console.log(password, hashedPassword);
          const isPasswordValid = await isValidPassword(
            password,
            hashedPassword
          );
          if (!isPasswordValid) {
            return done(null, false, { message: "Contraseña incorrecta" });
          }
          return done(null, user);
        } catch (error) {
          return done(null, false, { message: error.message });
        }
      }
    )
  );
};

export default initializePassport;
