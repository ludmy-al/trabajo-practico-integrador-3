import { Schema } from "mongoose";

const categorySchema = new Schema(
    {
        title: {
            type: Datatype.STRING(3-150),
            unique: true,
        },
        description: {
            type: Datatype.STRING(3-150),
            unique: true,
        },
    }
)