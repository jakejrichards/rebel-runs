import * as _ from "lodash";
import * as moment from "moment";
import { Component, OnInit } from "@angular/core";
import {
  RestaurantService,
  Order,
  Restaurant,
  Message
} from "src/app/services/restaurant.service";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-driver",
  templateUrl: "./driver.page.html",
  styleUrls: ["./driver.page.scss"]
})
export class DriverPage implements OnInit {
  orders: Order[] = [];
  restaurants: Restaurant[] = [];
  messages: Message[] = [];

  constructor(
    private restaurantService: RestaurantService,
    private authService: AuthService,
    private router: Router
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

  myMessages = () => {
    return this.router.navigateByUrl("/messages");
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
    this.restaurantService.getMessages().subscribe(messages => {
      console.log(messages);
      this.messages = _.sortBy(
        messages.filter(
          message => message.user_id === this.authService.user.uid
        ),
        "created_at"
      ).map(message => ({
        ...message,
        created_at: moment(message.created_at).format("LLL")
      }));
    });
  }
}
