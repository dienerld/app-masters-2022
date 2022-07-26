const isProdEnvironment = /Production/i.test(process.env.NODE_ENV);

const setConfig = () => {
  if (isProdEnvironment) {
    console.log('Running in Production environment');
    return {
      entities: ['./dist/src/**/*.model.js'],
      migrations: ['./dist/src/database/migrations/*.js'],
      migrationsRun: true,
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    };
  }

  console.log('Running in Development environment');
  return {
    entities: ['./src/**/*.model.ts'],
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

};
