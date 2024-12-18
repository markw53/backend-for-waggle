import db from "../db/connection.js";

export const getAllUsers = async () => {
  const result = await db.query("SELECT * FROM users");
  return result.rows;
};

export const getUserById = async id => {
  const result = await db.query("SELECT * FROM users WHERE user_id = $1", [id]);
  return result.rows[0];
};

export const createUser = async userData => {
  const { username, email, password, phone_number, created_at } = userData;

  const result = await db.query(
    `INSERT INTO users (username, email, password, phone_number, created_at) 
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [username, email, password, phone_number, created_at || new Date()]
  );
  return result.rows[0];
};

export const updateUser = async (id, updateData) => {
  const setClauses = Object.keys(updateData)
    .map((key, index) => `${key} = $${index + 1}`)
    .join(", ");

  const values = Object.values(updateData);

  const result = await db.query(
    `UPDATE users SET ${setClauses} WHERE user_id = $${values.length +
      1} RETURNING *`,
    [...values, id]
  );
  return result.rows[0];
};

export const deleteUser = async id => {
  const result = await db.query(
    "DELETE FROM users WHERE user_id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};
