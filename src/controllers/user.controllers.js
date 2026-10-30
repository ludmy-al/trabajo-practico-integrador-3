import { UserModel } from "../models/user.models.js";
import { EventModel } from "../models/events.models.js";

// Eliminación lógica de usuario y en cascadas
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // esto busca usuarios
        const user = await UserModel.findOne({
            _id: id,
            deleteAt: null,
        });
        if (!user) {
            return res.status(404).json({
                msg: "Usuario no encontrado",
            });
        }

        // esto elimina la logica del usuario
        user.deleteAt = new Date();
        await user.save();

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