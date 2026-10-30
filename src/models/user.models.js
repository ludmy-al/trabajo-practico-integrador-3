import { Model, Schema, Types } from "mongoose";

// Esquema de la propiedad embebida
const profileSchema = new Schema(
    {
        firstName: {
            type: String,
            minlength: 2,
            maxlength: 50,
        },
        lastName: {
            type: String,
            minlength: 2,
            maxlength: 50,
        },
        birthDate: {
            type: Date,
            default: true,
        },
        phone: {
            type: String,
            default: true,
        },
            
    },
    { _id: false }
);

// Esquema del usuario
const userSchema = new Schema(
    "user",
    {
        username: {
            type: String,
            required: true,
            unique: true,
            minlength: 3,
            maxlength: 20,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            allowNull: false,
            match: /^\S+@\S+\.\S+$/,
        },
        password: {
            type: DataTypes.STRING(255),
            required: true,
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        // Relación 1:1 embebidas - User -> Profile
        profile: {
            type: DataTypes.DATE,
            default: () => ({}),
        },
        deletedAt: {
            type: DataTypes.DATE,
            default: null,
        },
        
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

// Virtual populate events → eventos organizados por el usuario
// Relación 1:N - User -> Event
userSchema.virtual("events", {
    ref: "Event",
    localField: "_id",
    foreignField: "organizer",
});

userSchema.set("toJSON", { virtuals: true });
userSchema.set("toObject", { virtuals: true });


userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

// Eliminación lógica
userSchema.pre("find", function () {
    this.where({ deletedAt: null });
});
userSchema.pre("findOne", function () {
    this.where({ deletedAt: null });
});
userSchema.pre("CountDocuments", function () {
    this.where({ deletedAt: null });
});

export const UserModel = model("User", userSchema);