const isProdEnvironment = /Production/i.test(process.env.NODE_ENV);

const isTest = () => {
  if (isProdEnvironment) {
    console.log('Running in Production environment');
    return {
      entities: ['./dist/src/**/*.model.js'],
      migrations: ['./dist/src/database/migrations/*.js'],
      migrationsRun: true,
    };
  }

  console.log('Running in Development environment');
  return {
    dropSchema: true,
    logging: true,
    entities: ['./src/**/*.model.{js,ts}'],
    migrations: ['./src/database/migrations/*.ts'],
  };
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
  cli: {
    migrationsDir: './src/database/migrations',
    entitiesDir: './src/**/*.model.ts',
  },
};
