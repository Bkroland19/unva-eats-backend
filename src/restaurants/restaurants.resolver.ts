import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { timeStamp } from "console";
import { CreateRestaurantDto } from "./dtos/create-restaurant.dto";
import { UpdateRestaurantDto } from "./dtos/update-restaurant.dto";
import { Restaurant } from "./entities/restaurant.entity";
import { RestaurantService } from "./restaurants.service";

@Resolver( )
export class RestaurantResolver {
    constructor(private readonly restaurantService:RestaurantService){}
    //query decorator
    @Query(returns => [Restaurant])
    restaurants():Promise <Restaurant[]>{
        return this.restaurantService.getAll();
    }

    @Mutation(returns => Boolean)
    async createRestaurant(
       @Args('input') createRestaurantDto:CreateRestaurantDto,
    ):Promise<boolean>{
        try{
         await this.restaurantService.createRestaurant(createRestaurantDto);
         return true
        }catch(e){
            console.log(e)
            return false
        }
    }

    @Mutation(returns => Boolean)
    async updateRestaurant(
        @Args('input') updateRestaurantDto:UpdateRestaurantDto
  ): Promise<boolean>{
      try{
              await this.restaurantService.updateRestaurant(updateRestaurantDto )
              return true
      }catch(e){
          console.log(e)
          return false
      }
  }
}