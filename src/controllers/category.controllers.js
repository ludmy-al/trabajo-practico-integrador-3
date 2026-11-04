import { CategoryModel } from "../models/category.models.js";
import { EventsMdels } from "../models/events.models.js";

// Eliminación de categoria en cascada
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        //para buscar la categoria
        const category = await CategoryModel.findById(id);
        
        if (!category) {
            return res.status(404).json({
                msg: "Categoría no encontrada",
            });
        }
        
        //para quitar lod eventos que hacen referencia
        await EventsMdels.updateMany(
            { categories: id },
            { $pull: { categories: id } }
        );
        
        //para eliminar la categoría
        await CategoryModel.findByIdAndDelete(id);
        
        return res.status(200).json({
            msg: "Categoría eliminada correctamente en todos los eventos",
        });
    } catch (error) {
        return res.status(500).json({
            msg: "Error al eliminar la categoria",
            error: error.message,
        });
    }
};