import { Router } from "express";
import {
  getAllCars,
  getCarsById,
  createCars,
  updateCars,
  deleteCars,
} from "../controllers/carsController"; 

const carsRoutes = Router();

/**
 * @swagger
 * tags:
 *   name: Cars
 *   description: CRUD relacionado con carros
 */

/**
 * @swagger
 * /api/cars:
 *   get:
 *     summary: Obtener todos los carros
 *     tags: [Cars]
 *     responses:
 *       200:
 *         description: Lista de carros
 */
carsRoutes.get("/", getAllCars);

/**
 * @swagger
 * /api/cars/{id}:
 *   get:
 *     summary: Obtener un carro por ID
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del carro
 *     responses:
 *       200:
 *         description: Detalles del carro
 *       404:
 *         description: Carro no encontrado
 */
carsRoutes.get("/:id", getCarsById);

/**
 * @swagger
 * /api/cars:
 *   post:
 *     summary: Crear un nuevo carro
 *     tags: [Cars]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Carro creado
 *       500:
 *         description: Error en el servidor
 */
carsRoutes.post("/", createCars);

/**
 * @swagger
 * /api/cars/{id}:
 *   put:
 *     summary: Actualizar un carro existente
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del carro
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Carro actualizado
 *       404:
 *         description: Carro no encontrado
 *       500:
 *         description: Error en el servidor
 */
carsRoutes.put("/:id", updateCars);

/**
 * @swagger
 * /api/cars/{id}:
 *   delete:
 *     summary: Eliminar un carro
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del carro
 *     responses:
 *       200:
 *         description: Carro eliminado
 *       404:
 *         description: Carro no encontrado
 *       500:
 *         description: Error en el servidor
 */
carsRoutes.delete("/:id", deleteCars);

export default carsRoutes;