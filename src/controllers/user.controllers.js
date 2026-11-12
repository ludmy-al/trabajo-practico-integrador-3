import { UserModel } from "../models/user.models.js";
import { EventModel } from "../models/events.models.js";

export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find({ deletedAt: null }).populate("events", "title startDate status");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los usuarios", error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const user = await UserModel.findOne({ _id: id, deletedAt: null }).populate(
      "events",
      "title startDate status",
    );

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el usuario", error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id, profile, ...data } = matchedData(req);
    const user = await UserModel.findOne({ _id: id, deletedAt: null });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (data.password) {
      data.password = await hashPassword(data.password);
    }

    user.set(data);
    if (profile) {
      Object.assign(user.profile, profile);
    }
    await user.save();

    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({ message: "Usuario actualizado correctamente", user: userResponse });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el usuario", error: error.message });
  }
};

// Eliminación lógica de usuario y en cascadas
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // esto busca usuarios
        const user = await UserModel.findOneAndUpdate(
            { _id: id, deletedAt: null },
            { deletedAt: new Date() },
            { returnDocument: "after" },
        );

        if (!user) {
            return res.status(404).json({
                msg: "Usuario no encontrado",
            });
        }

        // esto elimina la logica del usuario
        const { deleteCount } = await EventModel.deleteMany({ organizer: id });

        return res.status(200).json({
            msg: "Usuario y sus evenos eliminados correctamente",
        });
    } catch (error) {
        return res.status(500).json({
            msg: "Error al eliminar usuario",
            error: error.message,
        });
    }
};

