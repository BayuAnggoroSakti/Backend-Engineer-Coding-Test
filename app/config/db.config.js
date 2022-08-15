module.exports = {
  HOST: process.env.MYSQL_HOST || 'localhost',
  USER: process.env.MYSQL_USER || 'root',
  PASSWORD: process.env.MYSQL_PASSWORD || '',
  DB: process.env.MYSQL_DBNAME || 'db_todoapp',
  port: process.env.MYSQL_PORT || '3306',
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
