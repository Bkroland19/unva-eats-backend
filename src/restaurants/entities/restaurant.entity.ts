import { Field, ObjectType } from "@nestjs/graphql";
import { IsAlpha, IsBoolean, IsNumber, IsOptional, IsString, Length } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@ObjectType()
@Entity()
export class Restaurant{
    @PrimaryGeneratedColumn()
    @Field(type => Number)
    @IsNumber()
    id:number

    @Field( type => String)
    @Column()
    @IsString()
    @Length(5 ,20)
    name: string

    @Field(type => Boolean , { nullable:true ,defaultValue: true} )
    @Column({default: true})
    @IsOptional()
    @IsBoolean()
    isVegan:boolean

    @Field(type => String)
    @Column()
    @IsString()
    address:string

    @Field(type => String)
    @Column()
    @IsString()
    ownerName: string

    @Field(type => String)
    @Column()
    @IsString()
    categoryName:string
}