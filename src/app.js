import cookieParser from "cookie-parser";
import express from "express";
import passport from "passport";
import productRoutes from "./routes/products.routes.js";
import cartRoutes from "./routes/carts.routes.js";
import authRoutes from "./routes/auth.routes.js";
import currentRoute from "./routes/current.routes.js";
import DbConnection from "./config/dbConnection.js";
import { generateCustomResponses } from "./utils/generateCustomResponses.js";
import { config } from "./config/config.js";
import initializePassport from "./config/auth.config.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(passport.initialize());
initializePassport();
app.use(generateCustomResponses);

app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/auth", authRoutes);
app.use("/current", currentRoute);

DbConnection.getInstance();

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "¡Algo ha salido mal!" });
});

app.listen(config.port, () =>
  console.log(`El servidor está escuchando el puerto ${config.port}`)
);
