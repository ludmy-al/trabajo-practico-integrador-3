import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import { config } from "dotenv";
import { StartDB } from "./src/config/database.js";

config()

const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json());
app.use(cookieParser);
app.use(cors);

app.listen(PORT, async () => {
    await StartDB();
    console.log(`Servidor listo en el puerto ${PORT}`)
});