require('dotenv').config();
console.log(process.env);

const mysqlConnection = mysql.createConnection(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
  },
  console.log(`Connected to the employees_db database.`)
);

module.exports = mysqlConnection;
