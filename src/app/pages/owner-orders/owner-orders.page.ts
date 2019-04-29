import { Component, OnInit } from "@angular/core";
import {
  RestaurantService,
  Order,
  Restaurant
} from "src/app/services/restaurant.service";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-owner-orders",
  templateUrl: "./owner-orders.page.html",
  styleUrls: ["./owner-orders.page.scss"]
})
export class OwnerOrdersPage implements OnInit {
  orders: Order[] = [];
  restaurants: Restaurant[] = [];

  constructor(
    private restaurantService: RestaurantService,
    private authService: AuthService
  ) {}

  approve(order: Order) {
    return this.restaurantService.approveOrder(order);
  }

  reject(order: Order) {
    return this.restaurantService.rejectOrder(order);
  }

  pendingOrders() {
    return this.orders.filter(order => !order.approved);
  }

  getItemsText(order: Order) {
    return order.items.map(item => item.name).join(", ");
  }

  ngOnInit() {
    this.restaurantService.getRestaurants().subscribe(restaurants => {
      this.restaurants = restaurants;
    });
    this.restaurantService.getOrders().subscribe(orders => {
      console.log(orders);
      this.orders = orders
        .map(order => ({
          ...order,
          restaurant:
            this.restaurants.find(
              restaurant => restaurant.id === order.restaurant_id
            ) || ({} as any)
        }))
        .filter(
          order =>
            order.restaurant.owner_id === `owner.${this.authService.user.uid}`
        );
    });
  }
}
