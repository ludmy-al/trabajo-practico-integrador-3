import { Router } from "express";
import { deleteUser } from "../controllers/user.controllers.js";

const router = Router();

// Eliminación de usuario y sus eventos
router.delete("/:id", deleteUser);

export default router;