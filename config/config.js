module.exports = () => (
  {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    Dialect: process.env.DIALECT  
  }
) 
