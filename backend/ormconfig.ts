export default {
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  migrations: [
    './src/database/migrations/**.ts',
  ],
  entities: [
    './src/app/domains/*/entities/**.ts',
  ],
  logging: false,
  cli: {
    migrationsDir: './src/database/migrations',
  },
};
