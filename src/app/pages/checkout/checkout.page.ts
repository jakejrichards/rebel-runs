import * as _ from "lodash";
import { Component, OnInit } from "@angular/core";
import { CheckoutService } from "src/app/services/checkout.service";
import { RestaurantService } from "src/app/services/restaurant.service";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.page.html",
  styleUrls: ["./checkout.page.scss"]
})
export class CheckoutPage implements OnInit {
  total = 0;
  selected = [];

  constructor(
    private checkoutService: CheckoutService,
    private restaurantService: RestaurantService
  ) {}

  ngOnInit() {
    this.checkoutService.items().subscribe(items => {
      this.total = _.sum(items.map(item => item.price));
      this.selected = items;
    });
  }

  placeOrder() {
    this.restaurantService.createOrder({
      items: this.selected,
      total: this.total
    });
  }
}
