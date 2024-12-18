import * as ownersModel from "../models/ownersModel.js";

export const getAllOwners = async (req, res, next) => {
  try {
    const owners = await ownersModel.getAllOwners();
    res.status(200).json({ owners });
  } catch (err) {
    next(err);
  }
};

export const getOwnerById = async (req, res, next) => {
  try {
    const owner = await ownersModel.getOwnerById(req.params.id);
    if (!owner) return res.status(404).json({ error: "Owner not found" });
    res.status(200).json({ owner });
  } catch (err) {
    next(err);
  }
};

export const createOwner = async (req, res, next) => {
  try {
    const newOwner = await ownersModel.createOwner(req.body);
    res.status(201).json({ owner: newOwner });
  } catch (err) {
    next(err);
  }
};

export const updateOwner = async (req, res, next) => {
  try {
    const updatedOwner = await ownersModel.updateOwner(req.params.id, req.body);
    if (!updatedOwner) return res.status(404).json({ error: "Owner not found" });
    res.status(200).json({ owner: updatedOwner });
  } catch (err) {
    next(err);
  }
};

export const deleteOwner = async (req, res, next) => {
  try {
    const deletedOwner = await ownersModel.deleteOwner(req.params.id);
    if (!deletedOwner) return res.status(404).json({ error: "Owner not found" });
    res.status(200).json({ message: "Owner deleted successfully" });
  } catch (err) {
    next(err);
  }
};
