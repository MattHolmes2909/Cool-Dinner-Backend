const mysql = require('mysql2/promise');

const path = require('path');

const args = process.argv.slice(2)[0];

const envFile = args === 'test' ? '../.env.test' : '../.env';

require('dotenv').config({
  path: path.join(__dirname, envFile),
});

const { DB_PASSWORD, DB_NAME, DB_USER, DB_HOST, DB_PORT } = process.env;

const setUpDatabase = async () => {
  try {
    const db = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      port: DB_PORT,
    });

    await db.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`);
    await db.query(`USE ${DB_NAME}`);
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
    await db.query(`CREATE TABLE IF NOT EXISTS users (
            username VARCHAR(25) PRIMARY KEY,
            password VARCHAR(25),
            schoolClass VARCHAR(25),
            userType VARCHAR(25),
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
