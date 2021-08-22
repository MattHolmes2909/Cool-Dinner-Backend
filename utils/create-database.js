const mysql = require('mysql2/promise');

const path = require('path');

const args = process.argv.slice(2)[0];

const { CLEARDB_DATABASE_URL } = process.env;
// use args to determine if .env or .env.test should be loaded
const envFile = args === 'test' ? '../.env.test' : '../.env';

// load environment variables from env files
!CLEARDB_DATABASE_URL &&
  require('dotenv').config({
    path: path.join(__dirname, envFile),
  });

const { DB_PASSWORD, DB_NAME, DB_USER, DB_HOST, DB_PORT } = process.env;
console.log(DB_NAME);

const setUpDatabase = async () => {
  try {
    const db = CLEARDB_DATABASE_URL
      ? await mysql.createConnection(CLEARDB_DATABASE_URL)
      : await mysql.createConnection({
          host: DB_HOST,
          user: DB_USER,
          password: DB_PASSWORD,
          port: DB_PORT,
          database: DB_NAME,
        });

    // create the database if it doesn't already exist
    !CLEARDB_DATABASE_URL &&
      (await db.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`));
    !CLEARDB_DATABASE_URL && (await db.query(`USE ${DB_NAME}`));
    await db.query(`CREATE TABLE IF NOT EXISTS child(
            id INT PRIMARY KEY auto_increment,
            childName VARCHAR(25),
            schoolClass VARCHAR(25),
            foodOption VARCHAR(25),
            allergies VARCHAR(25)
            )`);
    await db.query(`CREATE TABLE IF NOT EXISTS canteen (
            foodOption VARCHAR(25) PRIMARY KEY,
            totalNumber INT,
            classNumberOne INT,
            classNumberTwo INT,
            classNumberThree INT,
            classNumberFour INT
            )`);
    // await db.query(`CREATE TABLE IF NOT EXISTS users (
    //         username VARCHAR(25) PRIMARY KEY,
    //         password VARCHAR(64),
    //         schoolClass VARCHAR(25),
    //         userType VARCHAR(25),
    //         )`);
    await db.query(`CREATE TABLE IF NOT EXISTS menu (
      id INT PRIMARY KEY auto_increment,
      foodName VARCHAR(25),
      value VARCHAR(25),
      foodOptionNum INT,
      allergens VARCHAR(25),
      dietary VARCHAR(25)
      )`);
    db.close();
  } catch (err) {
    console.log(
      `Your environment variables might be wrong. Please double check .env file`
    );
    console.log('Environment Variables are:', {
      DB_PASSWORD,
      DB_NAME,
      DB_USER,
      DB_HOST,
      DB_PORT,
    });
    console.log(err);
  }
};

setUpDatabase();
