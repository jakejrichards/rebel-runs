import * as _ from "lodash";
import * as moment from "moment";
import { Component, OnInit } from "@angular/core";
import {
  Order,
  RestaurantService,
  Restaurant
} from "src/app/services/restaurant.service";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { CheckoutService } from "src/app/services/checkout.service";

@Component({
  selector: "app-my-orders",
  templateUrl: "./my-orders.page.html",
  styleUrls: ["./my-orders.page.scss"]
})
export class MyOrdersPage implements OnInit {
  restaurants: Record<string, Restaurant> = {};
  orders: Order[] = [];

  constructor(
    private authService: AuthService,
    private checkoutService: CheckoutService,
    private restaurantService: RestaurantService,
    private router: Router
  ) {}

  numItemsInCheckout = 0;

  ngOnInit() { 
   this.checkoutService.items().subscribe(items => {
      this.numItemsInCheckout = items.length;
    });
    this.restaurantService.getRestaurants().subscribe(restaurants => {
      this.restaurants = _.keyBy(restaurants, "id");
    });
    this.restaurantService.getOrders().subscribe(orders => {
      this.orders = orders
        .filter(
          order => order.customer_id === `customer.${this.authService.user.uid}`
        )
        .map(order => ({
          ...order,
          placed_at: moment(order.placed_at).format("LLL"),
          restaurant: this.restaurants[order.restaurant_id],
          items_text: order.items.map(item => item.name).join(", ")
        }));
      console.log(this.orders);
    });
  }

  checkout() {
    this.router.navigateByUrl("/checkout");
  }
}
