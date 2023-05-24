import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';


@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
        isGlobal: true,
      }),
    PostModule, 
    TypeOrmModule.forRoot({
          type: 'postgres',
          host: '127.0.0.1',
          port: 5434,
          username: process.env.DB_USER,
          password: process.env.DB_PWD,
          database: process.env.DB_NAME,
          autoLoadEntities: true,
          synchronize: true
      })

  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}

