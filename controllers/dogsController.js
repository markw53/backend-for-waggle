import * as dogsModel from "../models/dogsModel.js";

export const getAllDogs = async (req, res, next) => {
  try {
    const dogs = await dogsModel.getAllDogs();
    res.status(200).json({ dogs });
  } catch (err) {
    next(err);
  }
};

export const getDogById = async (req, res, next) => {
  try {
    const dog = await dogsModel.getDogById(req.params.id);
    if (!dog) return res.status(404).json({ error: "Dog not found" });
    res.status(200).json({ dog });
  } catch (err) {
    next(err);
  }
};

export const createDog = async (req, res, next) => {
  try {
    const newDog = await dogsModel.createDog(req.body);
    res.status(201).json({ dog: newDog });
  } catch (err) {
    next(err);
  }
};

export const updateDog = async (req, res, next) => {
  try {
    const updatedDog = await dogsModel.updateDog(req.params.id, req.body);
    if (!updatedDog) return res.status(404).json({ error: "Dog not found" });
    res.status(200).json({ dog: updatedDog });
  } catch (err) {
    next(err);
  }
};

export const deleteDog = async (req, res, next) => {
  try {
    const deletedDog = await dogsModel.deleteDog(req.params.id);
    if (!deletedDog) return res.status(404).json({ error: "Dog not found" });
    res.status(200).json({ message: "Dog deleted successfully" });
  } catch (err) {
    next(err);
  }
};
