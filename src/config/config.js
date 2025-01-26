import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config();

export const config = {
  port: process.env.PORT,
  mongo_url: process.env.MONGO_URL,
  secret_jwt: process.env.SECRET_JWT,
  email_mailing: process.env.EMAIL,
  password_mailing: process.env.PASSWORD,
};

export const transport = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: config.email_mailing,
    pass: config.password_mailing,
  },
});
