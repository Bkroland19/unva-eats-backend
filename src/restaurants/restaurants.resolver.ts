import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateRestaurantDto } from "./dtos/create-restaurant.dto";
import { Restaurant } from "./entities/restaurant.entity";

@Resolver( )
export class RestaurantResolver {
    //query decorator
    @Query(returns => [Restaurant])
    restaurants(@Args('veganOnly') veganOnly:boolean): Restaurant[]{
        return []
    }

    @Mutation(returns => Boolean)
    createRestaurant(
       @Args() tcreateRestaurantDto:CreateRestaurantDto,
    ):boolean{
        console.log(tcreateRestaurantDto)
        return true
    }
}