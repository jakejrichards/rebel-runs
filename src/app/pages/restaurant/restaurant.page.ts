import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  Restaurant,
  RestaurantService
} from "src/app/services/restaurant.service";

@Component({
  selector: "app-restaurant",
  templateUrl: "./restaurant.page.html",
  styleUrls: ["./restaurant.page.scss"]
})
export class RestaurantPage implements OnInit {
  restaurant: Restaurant = {
    img: "",
    name: "",
    owner_id: ""
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private restaurantService: RestaurantService
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(route => {
      this.restaurantService
        .getRestaurant(route.get("id"))
        .valueChanges()
        .forEach(restaurant => {
          this.restaurant = restaurant;
        });
    });
  }
}
