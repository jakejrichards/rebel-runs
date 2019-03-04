import { Component, OnInit } from "@angular/core";
import {
  RestaurantService,
  Restaurant
} from "../../services/restaurant.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
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
