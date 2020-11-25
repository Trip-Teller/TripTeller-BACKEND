module.exports = {
  ci: {
    database: 'trip_teller',
    dialect: 'sqlite',
    storage: 'db.sqlite3',
    logging: false,
  },
  dev: {
    database: 'tirp_teller_dev',
    define: {
      charset: 'utf8mb4',
      dialectOptions: {
        collate: 'utf8mb4_unicode_ci',
      },
    },
    dialect: 'mysql',
    host: process.env.DB_ENDPOINT,
    logging: console.log,
    password: process.env.DB_PASSWORD,
    username: process.env.DB_USERNAME,
  },
  production: {
    database: 'trip_teller_main',
    define: {
      charset: 'utf8mb4',
      dialectOptions: {
        collate: 'utf8mb4_unicode_ci',
      },
    },
    dialect: 'mysql',
    host: process.env.DB_ENDPOINT,
    password: process.env.DB_PASSWORD,
    username: process.env.DB_USERNAME,
  },
};
