import passport from "passport";
import local from "passport-local";
import jwt, { ExtractJwt } from "passport-jwt";
import Product from "../daos/products.dao.js";
import Cart from "../daos/carts.dao.js";
import { createHas, isValidPassword } from "../utils/hashingUtils.js";
import { config } from "./config.js";

const LocalStrategy = local.Strategy;
const JwtStrategy = jwt.Strategy;

const ProductService = new Product();
const CartService = new Cart();

const cookieExtractor = (req) => {
  return req && req.cookies ? req.cookies["proyectoCookie"] : null;
};

const initializePassport = () => {
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
  passport.use('register', new LocalStrategy(
    {
        passReqToCallback: true,
        usernameField: 'email',
    },
    async(req,username,password,done) => {
        const { firstName, lastName, role } = req.body;
        if(!firstName || !lastName || !role || !username || !password){
            return done(null,false,{message: 'Faltan datos'});
        }
        if(role !== 'user' && role !== 'admin'){
            return done(null,false,{message: 'Rol inválido'});
        }
        try {
            const user = role === "user" ? await 
        } catch (error) {
            
        }
  ))

};
