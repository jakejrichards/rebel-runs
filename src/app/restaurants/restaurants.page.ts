import { Component, OnInit } from "@angular/core";
import { Restaurant, RestaurantService } from "../services/restaurant.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-restaurants",
  templateUrl: "./restaurants.page.html",
  styleUrls: ["./restaurants.page.scss"]
})
export class RestaurantsPage implements OnInit {
  restaurants: Restaurant[] = [];

  constructor(
    public restaurantService: RestaurantService,
    private router: Router
  ) {}

  ngOnInit() {
    this.restaurantService.getRestaurants().subscribe(restaurants => {
      this.restaurants = restaurants;
    });
  }

  create = () => {
    this.router.navigateByUrl("/create-restaurant");
  };
}
