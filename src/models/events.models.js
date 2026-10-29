import { Schema } from "mongoose";

const eventSchema = new Schema(
    {
        title: {
            type: Datatype.STRING(3-150),
            unique: true,
        },
        description: {
            type: Datatype.STRING(3-150),
            unique: true,
        },
        startDate: {
            type: Datatype.DATE,
            requiere: false,
        },
        endDate: {
            type: Datatype.DATE,
            requiere: false,
        },
        capacity: {
            type: Datatype.NUMBER.INTEGER,
            unique: true,
            // falta el minimo
        },
        price: {
            type: Datatype.NUMBER,
            unique: true,
            // falta el minimo y default
        },
        status: {
            type: Datatype.STRING(3-150),
            unique: true,
        },
    }
)