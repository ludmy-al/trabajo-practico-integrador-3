import { Router } from "express";
import { deleteCategory } from "../controllers/category.controllers.js";

const router = Router();

//eliminar la categorìa y quitarla de los eventos
router.delete("/:id", deleteCategory);

export default router;