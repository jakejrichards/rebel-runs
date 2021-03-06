import * as _ from "lodash";
import * as moment from "moment";
import { Component, OnInit } from "@angular/core";
import {
  Restaurant,
  RestaurantService,
  Message
} from "../../services/restaurant.service";
import { Router } from "@angular/router";
import { CheckoutService } from "src/app/services/checkout.service";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-restaurants",
  templateUrl: "./restaurants.page.html",
  styleUrls: ["./restaurants.page.scss"]
})
export class RestaurantsPage implements OnInit {
  numItemsInCheckout = 0;
  messages: Message[] = [];
  restaurants: Restaurant[] = [];
  cuisine_type = "all";
  sorter: "price" | "rating" = "rating";
  order: "asc" | "desc" = "desc";

  constructor(
    private checkoutService: CheckoutService,
    private authService: AuthService,
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
    this.checkoutService.items().subscribe(items => {
      this.numItemsInCheckout = items.length;
    });
    this.restaurantService.getRestaurants().subscribe(restaurants => {
      this.restaurants = restaurants;
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

  getRestaurants = () => {
    const restaurants = _.sortBy(
      this.restaurants.filter(
        r => this.cuisine_type === "all" || r.cuisine_type === this.cuisine_type
      ),
      [this.sorter]
    );
    return this.order === "asc" ? restaurants : _.reverse(restaurants);
  };

  myMessages = () => {
    this.router.navigateByUrl("/messages");
  };

  myOrders = () => {
    this.router.navigateByUrl("/my-orders");
  };

  checkout = () => {
    this.router.navigateByUrl("/checkout");
  };

  edit = (id: string) => {
    this.router.navigateByUrl(`/edit-restaurant/${id}`);
  };

  open = (id: string) => {
    this.router.navigateByUrl(`/restaurants/${id}`);
  };
}
