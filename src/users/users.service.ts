import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateAccountInput } from "./dtos/create-account.dto";
import * as jwt from 'jsonwebtoken'
import { LoginInput } from "./dtos/login.dto";
import { User } from "./entities/user.entity";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "src/jwt/jwt.service";

 

@Injectable()

 export class UsersService{
     constructor(
         @InjectRepository(User) private readonly users:Repository<User>,
         private readonly jwtService:JwtService
     ){}





    async createAccount({email , password , role}:CreateAccountInput) : Promise <{ok:boolean , error?:string}>{
         //check new user
         try{
             const exists = await this.users.findOneBy({email})
             if(exists){
                 //make error
                 return {ok:false ,error:"User with this email Already Exists"}
             }

             await this.users.save(this.users.create({email , password , role}))
             return {ok:true}
            

         }catch(e){
             //make error
             return {ok:false ,error:"Account creation Failed"} 
         }
          
         //create user && hash the password
         //ok


         //
     }



     async login({email , password}:LoginInput): Promise <{ok:boolean , error?:string , token?:string}>{

        //find the user with the email
        //check if the password is correct
        //give out a jwt

        try{

            const user = await this.users.findOneBy({email});

            if(!user){

                return{
                    ok:false,
                    error:"Such email doesnt exist in our database"
                }
                
            }

            const passwordCorrect = await user.checkPassword(password)

            if(!passwordCorrect){
                return {
                    ok:false,
                    error:"Password is Incorrect"
                }
            }

            const token = this.jwtService.sign(user.id)

            return{
                ok:true,
                token
            }

        }catch(error){
            return{
                ok:false , 
                error
            }
        }

     }


     async findById(id:number): Promise<User>{
         return this.users.findOneBy({id})
     }
 }