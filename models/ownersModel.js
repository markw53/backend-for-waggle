import db from "../db/connection.js";

export const getAllOwners = async () => {
  const result = await db.query('SELECT * FROM owners');
  return result.rows;
};

export const getOwnerById = async (id) => {
  const result = await db.query('SELECT * FROM owners WHERE owner_id = $1', [id]);
  return result.rows[0];
};

export const createOwner = async (ownerData) => {
  const { name, contact_info } = ownerData;

  const result = await db.query(
    `INSERT INTO owners (name, contact_info) 
     VALUES ($1, $2) RETURNING *`,
    [name, contact_info]
  );
  return result.rows[0];
};

export const updateOwner = async (id, updateData) => {
  const setClauses = Object.keys(updateData)
    .map((key, index) => `${key} = $${index + 1}`)
    .join(', ');

  const values = Object.values(updateData);

  const result = await db.query(
    `UPDATE owners SET ${setClauses} WHERE owner_id = $${values.length + 1} RETURNING *`,
    [...values, id]
  );
  return result.rows[0];
};

export const deleteOwner = async (id) => {
  const result = await db.query('DELETE FROM owners WHERE owner_id = $1 RETURNING *', [id]);
  return result.rows[0];
};
