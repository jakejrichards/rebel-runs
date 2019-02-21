import { Component, OnInit } from "@angular/core";
import { RestaurantService, Restaurant } from "../restaurant.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  restaurants: Restaurant[] = [];

  constructor(public restaurantService: RestaurantService) {}

  ngOnInit() {
    this.restaurantService.getRestaurants().subscribe(restaurants => {
      this.restaurants = restaurants;
      console.log(restaurants);
    });
  }
}
