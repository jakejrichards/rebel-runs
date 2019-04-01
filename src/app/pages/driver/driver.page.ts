import { Component, OnInit } from "@angular/core";
import { RestaurantService, Order } from "src/app/services/restaurant.service";

@Component({
  selector: "app-driver",
  templateUrl: "./driver.page.html",
  styleUrls: ["./driver.page.scss"]
})
export class DriverPage implements OnInit {
  orders = [];

  constructor(private restaurantService: RestaurantService) {}

  ngOnInit() {
    this.restaurantService.getOrders().subscribe(orders => {
      return orders.forEach(order => {
        return this.restaurantService
          .getRestaurant(order.restaurant_id)
          .forEach(restaurant => {
            this.orders.push({
              ...order,
              restaurant
            });
          });
      });
    });
  }
}
