const mysql = require('mysql2/promise');
require('dotenv').config();
const Host = process.env.DB_HOST
const IP = process.env.DB_IP
const User = process.env.DB_USER;
const Database = process.env.DB_BASE
const SENHA = process.env.DB_SENHA
const PORT = process.env.DB_PORT
const connection = mysql.createPool({
  host: Host | IP,
  user: User,
  password: SENHA,
  port: PORT,
  database: Database
});

module.exports = connection;