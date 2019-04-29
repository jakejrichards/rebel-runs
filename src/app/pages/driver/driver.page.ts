import { Component, OnInit } from "@angular/core";
import {
  RestaurantService,
  Order,
  Restaurant
} from "src/app/services/restaurant.service";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-driver",
  templateUrl: "./driver.page.html",
  styleUrls: ["./driver.page.scss"]
})
export class DriverPage implements OnInit {
  orders: Order[] = [];
  restaurants: Restaurant[] = [];

  constructor(
    private restaurantService: RestaurantService,
    private authService: AuthService
  ) {}

  claimOrder = (order: Order) => {
    return this.restaurantService.claimOrder(order, this.authService.user.uid);
  };

  updateOrder = (order: Order) => {
    this.restaurantService.updateOrder(order);
  };

  unclaimedOrders = () => {
    return this.orders.filter(order => !order.driver_id);
  };

  myOrders = () => {
    return this.orders.filter(
      order => order.driver_id === this.authService.user.uid
    );
  };

  async ngOnInit() {
    this.restaurantService.getRestaurants().subscribe(restaurants => {
      this.restaurants = restaurants;
    });
    this.restaurantService.getOrders().subscribe(orders => {
      this.orders = orders
        .map(order => ({
          ...order,
          restaurant:
            this.restaurants.find(
              restaurant => restaurant.id === order.restaurant_id
            ) || ({} as any)
        }))
        .filter(order => order.approved);
    });
  }
}
