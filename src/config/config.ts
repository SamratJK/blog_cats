export const DB_CONFIG = {
          type: 'postgres',
          host: '127.0.0.1',
          port: 5434,
          username: process.env.DB_USER,
          password: process.env.DB_PWD,
          database: process.env.DB_NAME,
          entities: [],
          synchronize: true
      }
