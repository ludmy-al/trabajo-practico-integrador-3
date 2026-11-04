import { Schema, model, version } from "mongoose";

const categorySchema = new Schema(
    {
       name: {
            type: String,
            required: true,
            unique: true,
            minlength: 3,
            maxlength: 20,
        },
        description: {
            type: String,
            versionKey: false,
        },
    }
);

// Virtual populate events → eventos que tienen la categoría en su array categories.
// Relación N:M REFERENCIADA - Category <-> Event
categorySchema.virtual("events", {
    ref: "Event",
    localField: "_id",
    foreignField: "categories",
})


categorySchema.set("toJSON", { virtuals: true });
categorySchema.set("toObject", { virtuals: true });

export const CategoryModel = model("category", categorySchema);