import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT,
  mongo_url: process.env.MONGO_URL,
  secret_jwt: process.env.SECRET_JWT,
};
