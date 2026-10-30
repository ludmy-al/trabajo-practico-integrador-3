import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import { config } from "dotenv";
import { StartDB } from "./src/config/database.js";
import userRoutes from "./src/routes/user.routes.js";
import categoryRoutes from "./src/routes/category.routes.js";

config()

const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);

app.listen(PORT, async () => {
    await StartDB();
    console.log(`Servidor listo en el puerto ${PORT}`)
});