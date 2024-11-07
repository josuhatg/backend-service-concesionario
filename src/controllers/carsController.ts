import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Cars } from "../entities/Cars";

const productRepository = AppDataSource.getRepository(Cars);

// GET - Obtener Todos los Productos
export const getAllCars = async(req: Request, res: Response) => {
  try {
    const Cars = await productRepository.find();
    res.json(Cars);
  } catch(error) {
    res.status(500).json({ message: "Error al obtener productos." });
  }
};

// GET by ID - Obetener Producto por ID
export const getProductById = async(req: Request, res: Response) => {
  try {
    const Cars = await productRepository.findOneBy({
      id: parseInt(req.params.id),
    });

    if(Cars) {
      res.json(Cars);
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch(error) {
    res.status(500).json({ message: "Error al obtener el producto." });
  }
};

// POST - Crear un nuevo Producto
export const createProduct = async(req: Request, res: Response) => {
  try {
    const { name, description, price } = req.body;
    const Cars = new Cars();
    Cars.name = name;
    Cars.description = description;
    Cars.price = price;

    await productRepository.save(Cars);
    res.status(201).json(Cars);
  } catch(error) {
    res.status(500).json({ message: "Error al crear el producto." });
  }
};

// PUT - Actualizar un Producto existente
export const updateProduct = async(req: Request, res: Response) => {
  try {
    const { name, description, price } = req.body;
    const Cars = await productRepository.findOneBy({
      id: parseInt(req.params.id),
    });

    if(Cars) {
      Cars.name = name ?? Cars.name;
      Cars.description = description ?? Cars.description;
      Cars.price = price ?? Cars.price;

      await productRepository.save(Cars);
      res.json(Cars);
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch(error) {
    res.status(500).json({ message: "Error al actualizar el producto." });
  }
};

// DELETE - Borrar un Producto
export const deleteProduct = async(req: Request, res: Response) => {
  try {
    const Cars = await productRepository.findOneBy({
      id: parseInt(req.params.id),
    });

    if (Cars) {
      await productRepository.remove(Cars);
      res.json({ message: "Producto eliminado." });
    } else {
      res.status(404).json({ message: "Producto no encontrado." });
    }
  } catch(error) {
    res.status(500).json({ message: "Error al eliminar el producto." });
  }
};