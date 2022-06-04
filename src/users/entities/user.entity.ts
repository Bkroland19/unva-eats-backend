import { CoreEntity } from "src/common/entities/core.entity";
import {InputType ,  ObjectType  , Field, registerEnumType} from "@nestjs/graphql";

import { BeforeInsert, Column, Entity } from "typeorm";
import * as bcrypt from 'bcrypt'
import console from "console";
import { InternalServerErrorException } from "@nestjs/common";
import { IsEmail, IsEnum, IsString } from "class-validator";


enum UserRole {
  Client ,Owner , Delivery
}


//creating the enum on graphql
 
registerEnumType(UserRole , {name:'UserRole'})

@InputType({isAbstract:true})
@ObjectType()
@Entity()
export class User extends CoreEntity{
    
  @Field( type => String)
  @Column()
  @IsEmail()
  email:string;
  

  @Field( type => String)
  @Column()
  
  password:string;


  @Field( type => UserRole)
  @Column({
    type:'enum' , enum:UserRole
  })
  @IsEnum(UserRole)
  role:UserRole;



  @BeforeInsert()
  async HashPasswords():Promise<void>{
    try{
      this.password = await bcrypt.hash(this.password , 10)
    }catch(e){
      console.log(e)

      throw new InternalServerErrorException()
    }
  }



  async checkPassword(aPassword:string):Promise<boolean>{
    try{
     const ok =  await bcrypt.compare(aPassword , this.password)
     return ok;

      
    }catch(error){
      console.log(error)
      throw new InternalServerErrorException()
    }
  }
}