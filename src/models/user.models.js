import { Model, Schema, Types } from "mongoose";

const userSchema = new Schema(
    "user",
    {
        username: {
            type: DataTypes.STRING(3-20),
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM("user", "admin"),
            default: "user",
        },
        // propiedad embebida
        profile: [
            firstName: {
                type: DataTypes.STRING(2-50),
            },
            lastName: {
                type: DataTypes.STRING(2-50),
            },
            birthDate: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        ]
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

export const UserModel = model("User", userSchema);