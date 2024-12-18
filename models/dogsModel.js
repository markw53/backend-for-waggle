import db from "../db/connection.js";

export const getAllDogs = async () => {
  const result = await db.query("SELECT * FROM dogs");
  return result.rows;
};

export const getDogById = async (id) => {
  const result = await db.query("SELECT * FROM dogs WHERE dog_id = $1", [id]);
  return result.rows[0];
};

export const createDog = async (dogData) => {
  const {
    name,
    breed,
    colour,
    date_of_birth,
    dna_results,
    eye_tests,
    hip_score_left,
    hip_score_right,
    elbow_score_left,
    elbow_score_right,
    inbreeding_coefficient,
    breeding_value,
    photo_url,
    location,
    owner_id,
    user_id,
  } = dogData;

  const result = await db.query(
    `INSERT INTO dogs (
      name, breed, colour, date_of_birth, dna_results, eye_tests,
      hip_score_left, hip_score_right, elbow_score_left, elbow_score_right,
      inbreeding_coefficient, breeding_value, photo_url, location, owner_id, user_id
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16
    ) RETURNING *`,
    [
      name,
      breed,
      colour,
      date_of_birth,
      dna_results,
      eye_tests,
      hip_score_left,
      hip_score_right,
      elbow_score_left,
      elbow_score_right,
      inbreeding_coefficient,
      breeding_value,
      photo_url,
      location,
      owner_id,
      user_id,
    ]
  );
  return result.rows[0];
};

export const updateDog = async (id, updateData) => {
  const setClauses = Object.keys(updateData)
    .map((key, index) => `${key} = $${index + 1}`)
    .join(", ");

  const values = Object.values(updateData);

  const result = await db.query(
    `UPDATE dogs SET ${setClauses} WHERE dog_id = $${values.length + 1} RETURNING *`,
    [...values, id]
  );
  return result.rows[0];
};

export const deleteDog = async (id) => {
  const result = await db.query(
    "DELETE FROM dogs WHERE dog_id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};
