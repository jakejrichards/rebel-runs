import * as _ from "lodash";
import { Component, OnInit } from "@angular/core";
import {
  Restaurant,
  RestaurantService
} from "../../services/restaurant.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-owner",
  templateUrl: "./owner.page.html",
  styleUrls: ["./owner.page.scss"]
})
export class OwnerPage implements OnInit {
  restaurants: Restaurant[] = [];

  constructor(
    public restaurantService: RestaurantService,
    private router: Router
  ) {}

  getPriceText(price: number) {
    return _.times(price, () => "$").join("");
  }

  getRatingText(rating: number) {
    return _.times(rating, () => "&#9733;").join("");
  }

  ngOnInit() {
    this.restaurantService.getRestaurants().subscribe(restaurants => {
      this.restaurants = restaurants;
    });
  }

  create = () => {
    this.router.navigateByUrl("/create-restaurant");
  };

  open = (id: string) => {
    this.router.navigateByUrl(`/owner-menu/${id}`);
  };

  edit = (id: string) => {
    this.router.navigateByUrl(`/edit-restaurant/${id}`);
  };
}
