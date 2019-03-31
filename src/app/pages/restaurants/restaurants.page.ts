import { Component, OnInit } from "@angular/core";
import {
  Restaurant,
  RestaurantService
} from "../../services/restaurant.service";
import { Router } from "@angular/router";
import { CheckoutService } from "src/app/services/checkout.service";

@Component({
  selector: "app-restaurants",
  templateUrl: "./restaurants.page.html",
  styleUrls: ["./restaurants.page.scss"]
})
export class RestaurantsPage implements OnInit {
  numItemsInCheckout = 0;
  restaurants: Restaurant[] = [];

  constructor(
    private checkoutService: CheckoutService,
    public restaurantService: RestaurantService,
    private router: Router
  ) {}

  ngOnInit() {
    this.checkoutService.items().subscribe(items => {
      this.numItemsInCheckout = items.length;
    });
    this.restaurantService.getRestaurants().subscribe(restaurants => {
      this.restaurants = restaurants;
    });
  }

  myOrders = () => {
    this.router.navigateByUrl("/my-orders");
  };

  checkout = () => {
    this.router.navigateByUrl("/checkout");
  };

  open = (id: string) => {
    this.router.navigateByUrl(`/restaurants/${id}`);
  };
}
