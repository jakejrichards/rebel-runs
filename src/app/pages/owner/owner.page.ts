import * as _ from "lodash";
import * as moment from "moment";
import { Component, OnInit } from "@angular/core";
import {
  Restaurant,
  RestaurantService,
  Message
} from "../../services/restaurant.service";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-owner",
  templateUrl: "./owner.page.html",
  styleUrls: ["./owner.page.scss"]
})
export class OwnerPage implements OnInit {
  restaurants: Restaurant[] = [];
  messages: Message[] = [];

  constructor(
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
    this.restaurantService.getRestaurants().subscribe(restaurants => {
      this.restaurants = restaurants.filter(
        ({ owner_id }) => owner_id === `owner.${this.authService.user.uid}`
      );
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

  myMessages = () => {
    this.router.navigateByUrl("/messages");
  };

  viewOrders = () => {
    this.router.navigateByUrl("/owner-orders");
  };

  create = () => {
    this.router.navigateByUrl("/create-restaurant");
  };

  open = (id: string) => {
    this.router.navigateByUrl(`/owner-menu/${id}`);
  };

  edit = (id: string) => {
    this.router.navigateByUrl(`/edit-restaurant/${id}`);
  };
}
