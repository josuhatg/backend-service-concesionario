import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Cars } from "../entities/Cars";

const carsRepository = AppDataSource.getRepository(Cars);

// GET - Obtener Todos los Productos
export const getAllCars = async(req: Request, res: Response) => {
  try {
    const cars = await carsRepository.find();
    res.json(cars);
  } catch(error) {
    res.status(500).json({ message: "Error al obtener productos." });
  }
};

// GET by ID - Obetener Producto por ID
export const getCarsById = async(req: Request, res: Response) => {
  try {
    const cars = await carsRepository.findOneBy({
      id: parseInt(req.params.id),
    });

    if(cars) {
      res.json(cars);
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch(error) {
    res.status(500).json({ message: "Error al obtener el producto." });
  }
};

// POST - Crear un nuevo Producto
export const createCars = async(req: Request, res: Response) => {
  try {
    const { name, description, price } = req.body;
    const cars = new Cars();
    cars.name = name;
    cars.description = description;
    cars.price = price;

    await carsRepository.save(cars);
    res.status(201).json(cars);
  } catch(error) {
    res.status(500).json({ message: "Error al crear el producto." });
  }
};

// PUT - Actualizar un Producto existente
export const updateCars = async(req: Request, res: Response) => {
  try {
    const { name, description, price } = req.body;
    const cars = await carsRepository.findOneBy({
      id: parseInt(req.params.id),
    });

    if(cars) {
      cars.name = name ?? cars.name;
      cars.description = description ?? cars.description;
      cars.price = price ?? cars.price;

      await carsRepository.save(cars);
      res.json(cars);
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch(error) {
    res.status(500).json({ message: "Error al actualizar el producto." });
  }
};

// DELETE - Borrar un Producto
export const deleteCars = async(req: Request, res: Response) => {
  try {
    const cars = await carsRepository.findOneBy({
      id: parseInt(req.params.id),
    });

    if (cars) {
      await carsRepository.remove(cars);
      res.json({ message: "Producto eliminado." });
    } else {
      res.status(404).json({ message: "Producto no encontrado." });
    }
  } catch(error) {
    res.status(500).json({ message: "Error al eliminar el producto." });
  }
};