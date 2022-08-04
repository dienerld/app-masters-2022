const isTestEnvironment = process.env.NODE_ENV === 'Production';

const isTest = () => {
  if (isTestEnvironment) {
    return {
      dropSchema: true,
      logging: false,
      migrationsRun: true,
    };
  }
  return {};
};
const setConnection = () => {
  if (process.env.DATABASE_URL) {
    return {
      url: process.env.DATABASE_URL,
    };
  }

  return {
    host: process.env.TYPEORM_DB_HOST,
    port: Number(process.env.TYPEORM_DB_PORT),
    username: process.env.TYPEORM_DB_USERNAME,
    password: process.env.TYPEORM_DB_PASSWORD,
    database: process.env.TYPEORM_DB_DATABASE,
  };
};

module.exports = {
  type: process.env.TYPEORM_DB_TYPE,
  ...setConnection(),
  ...isTest(),
  entities: ['./src/**/*.model.{js,ts}'],
  migrations: ['./src/database/migrations/*.{js,ts}'],
  cli: {
    migrationsDir: './src/database/migrations',
    entitiesDir: './src/**/*.model.ts',
  },
};
