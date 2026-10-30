import { Schema, model } from "mongoose";

// Esquema de propiedad embebida
const locationSchema = new Schema(
  {
    venue: {
      type: String,
      minlength: 3,
      maxlength: 100,
    },
    address: {
      type: String,
      minlength: 5,
      maxlength: 150,
    },
    city: {
      type: String,
      minlength: 2,
      maxlength: 50,
    },
  },
  { _id: false }
);

// Esquema del evento
const eventSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
            minlength: 3,
            maxlength: 150,
        },
        description: {
            type: String,
            required: true,
            unique: true,
            minlength: 20,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        capacity: {
            type: Number,
            required: true,
            min: 1,
            validate: Number.isInteger,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        },
        status: {
            ype: String,
            enum: ["scheduled", "cancelled", "finished"],
            default: "scheduled",
        },
        // Relación 1:1 embebidas - Event -> Location
        location: {
            type: locationSchema,
            required: true,
        },
        // Relación 1:N Referenciadas - User -> Event
        organizer: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        // Relación N:M Referenciadas - Event <-> Category
        categories: [
            {
                type: Schema.Types.ObjectId,
                ref: "Category",
            },
        ],
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const EventModel = model("Event", eventSchema);