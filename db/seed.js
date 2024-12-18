import db from "../db/connection.js";
import format from "pg-format";

export default function seed({ ownerData, userData, dogData }) {
  return db
    .query(`DROP TABLE IF EXISTS dogs CASCADE;`)
    .then(() => db.query(`DROP TABLE IF EXISTS owners CASCADE;`))
    .then(() => db.query(`DROP TABLE IF EXISTS users CASCADE;`))
    .then(() => {
      // Create owners table
      return db.query(`
        CREATE TABLE owners (
          owner_id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          contact_info JSONB NOT NULL
        );
      `);
    })
    .then(() => {
      // Create users table with firebase_uid instead of password
      return db.query(`
        CREATE TABLE users (
          user_id SERIAL PRIMARY KEY,
          firebase_uid VARCHAR(128) UNIQUE NOT NULL, -- Firebase UID
          username VARCHAR(50) UNIQUE NOT NULL,
          email VARCHAR(100) UNIQUE NOT NULL,
          phone_number VARCHAR(15),
          created_at TIMESTAMP DEFAULT NOW()
        );
      `);
    })
    .then(() => {
      // Create dogs table
      return db.query(`
        CREATE TABLE dogs (
          dog_id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          breed VARCHAR(255) NOT NULL,
          colour VARCHAR(255),
          date_of_birth DATE,
          dna_results BOOLEAN,
          eye_tests VARCHAR(255),
          hip_score_left INT,
          hip_score_right INT,
          elbow_score_left INT,
          elbow_score_right INT,
          inbreeding_coefficient FLOAT,
          breeding_value FLOAT,
          photo_url TEXT,
          location VARCHAR(255),
          owner_id INT REFERENCES owners(owner_id) ON DELETE SET NULL,
          user_id INT REFERENCES users(user_id)
        );
      `);
    })
    .then(() => {
      // Insert owners
      const insertOwnerQueryStr = format(
        "INSERT INTO owners (name, contact_info) VALUES %L RETURNING owner_id;",
        ownerData.map(({ name, contact_info }) => [name, JSON.stringify(contact_info)])
      );
      return db.query(insertOwnerQueryStr);
    })
    .then(() => {
      // Insert users
      const insertUserQueryStr = format(
        "INSERT INTO users (firebase_uid, username, email, phone_number, created_at) VALUES %L RETURNING user_id;",
        userData.map(({ firebase_uid, username, email, phone_number, created_at }) => [
          firebase_uid,
          username,
          email,
          phone_number,
          created_at,
        ])
      );
      return db.query(insertUserQueryStr);
    })
    .then(() => {
      // Insert dogs
      const insertDogQueryStr = format(
        `
        INSERT INTO dogs (
          name, breed, colour, date_of_birth, dna_results, eye_tests,
          hip_score_left, hip_score_right, elbow_score_left, elbow_score_right,
          inbreeding_coefficient, breeding_value, photo_url, location, owner_id, user_id
        ) VALUES %L;
        `,
        dogData.map(
          ({
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
          }) => [
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
        )
      );
      return db.query(insertDogQueryStr);
    });
}
