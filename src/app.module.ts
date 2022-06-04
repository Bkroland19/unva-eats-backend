import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';


@Module({
  imports: [
 
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath: process.env.NODE_ENV ==='dev' ? '.env.dev' : '.test.env',
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev' ,'prod').default('dev').required(),
        DB_HOST:Joi.string().required(),
        DB_USERNAME:Joi.string().required(),
        DB_PORT:Joi.string().required(),
        DB_PASSWORD:Joi.string().required(),
        DB_NAME:Joi.string().required(),
      }),
       

    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: process.env.NODE_ENV !== 'prod',
      logging: true,
      entities:[User]
    }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
   
    UsersModule,
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
