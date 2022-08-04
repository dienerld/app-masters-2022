const isProdEnvironment = /Production/i.test(process.env.NODE_ENV);

const setConfig = () => {
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
  console.log('Database connection: ', process.env.DATABASE_URL);
  if (process.env.DATABASE_URL) {
    return {
      url: process.env.DATABASE_URL,
    };
  }
  console.log('Database connection HOST: ', process.env.TYPEORM_DB_HOST);

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
  ...setConfig(),
  cli: {
    migrationsDir: './src/database/migrations',
    entitiesDir: './src/**/*.model.ts',
  },
  extra: {
    ssl: true,
  },
};
