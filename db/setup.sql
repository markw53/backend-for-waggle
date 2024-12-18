DROP DATABASE IF EXISTS dog_mating_test;
DROP DATABASE IF EXISTS dog_mating;

DROP TABLE owners CASCADE;
DROP TABLE users CASCADE;
DROP TABLE dogs CASCADE;

CREATE DATABASE dog_mating_test;
CREATE DATABASE dog_mating;

CREATE TABLE owners (
    owner_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    contact_info JSONB NOT NULL
);

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

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
