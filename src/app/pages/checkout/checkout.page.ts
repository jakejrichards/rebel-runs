import * as _ from "lodash";
import { Component, OnInit } from "@angular/core";
import { CheckoutService } from "src/app/services/checkout.service";
import {
  RestaurantService,
  Restaurant
} from "src/app/services/restaurant.service";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.page.html",
  styleUrls: ["./checkout.page.scss"]
})
export class CheckoutPage implements OnInit {
  total = 0;
  items = [];
  restaurant: Restaurant = {
    id: "",
    owner_id: "",
    img: "",
    name: ""
  };

  constructor(
    private authService: AuthService,
    private checkoutService: CheckoutService,
    private restaurantService: RestaurantService,
    private router: Router
  ) {}

  ngOnInit() {
    this.checkoutService.items().subscribe(items => {
      if (!items.length) return;
      const [{ restaurant_id }] = items;
      this.restaurantService
        .getRestaurant(restaurant_id)
        .forEach(restaurant => {
          this.restaurant = restaurant;
        });
      this.total = Math.floor(_.sum(items.map(item => item.price)) * 100) / 100;
      this.items = items;
    });
  }

  backToRestaurants() {
    this.router.navigateByUrl("/restaurants");
  }

  placeOrder() {
    console.log("TEST");
    return this.restaurantService.createOrder({
      items: this.items,
      total: this.total,
      customer_id: `customer.${this.authService.user.uid}`,
      restaurant_id: "id"
    });
  }
}
