import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  RestaurantService,
  Restaurant
} from "src/app/services/restaurant.service";

@Component({
  selector: "app-edit-restaurant",
  templateUrl: "./edit-restaurant.page.html",
  styleUrls: ["./edit-restaurant.page.scss"]
})
export class EditRestaurantPage implements OnInit {
  restaurant: Restaurant = {
    id: "",
    img: "",
    address: "",
    pnumber: "",
    name: "",
    owner_id: "",
    cuisine_type: "",
    rating: 0,
    price: 1
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private restaurantService: RestaurantService,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(route => {
      this.restaurantService
        .getRestaurant(route.get("id"))
        .forEach(restaurant => {
          this.restaurant = restaurant;
        });
    });
  }

  save() {
    this.restaurantService
      .updateRestaurant(this.restaurant)
      .then(() => this.router.navigateByUrl("/owner"));
  }
}
