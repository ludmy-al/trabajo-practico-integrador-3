import mongoose from "mongoose";

export const StartDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/test");

        console.log("Conectado con la DB correctamente")
    
    } catch (error) {
        console.log("No se pudo conectar con la DB", error);
    }
}