import { Component, OnInit } from "@angular/core";
import { RestaurantService, Order } from "src/app/services/restaurant.service";

@Component({
  selector: "app-driver",
  templateUrl: "./driver.page.html",
  styleUrls: ["./driver.page.scss"]
})
export class DriverPage implements OnInit {
  orders: Order[] = [];

  constructor(private restaurantService: RestaurantService) {}

  ngOnInit() {
    this.restaurantService.getOrders().subscribe(orders => {
      console.log(orders);
      this.orders = orders;
    });
  }
}
