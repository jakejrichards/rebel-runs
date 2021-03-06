import * as _ from "lodash";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  Restaurant,
  RestaurantService
} from "src/app/services/restaurant.service";
import { CheckoutService } from "src/app/services/checkout.service";
import { ToastController } from "@ionic/angular";

@Component({
  selector: "app-restaurant",
  templateUrl: "./restaurant.page.html",
  styleUrls: ["./restaurant.page.scss"]
})
export class RestaurantPage implements OnInit {
  items = [];

  restaurant: Restaurant = {
    id: "",
    img: "",
    address: "",
    pnumber: "",
    name: "",
    owner_id: "",
    cuisine_type: "",
    price: 1,
    rating: 1
  };

  numItemsInCheckout = 0;

  getPriceText(price: number) {
    return _.times(price, () => "$").join("");
  }

  getRatingText(rating: number) {
    return _.times(rating, () => "&#9733;").join("");
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private checkoutService: CheckoutService,
    private restaurantService: RestaurantService,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(route => {
      this.restaurantService
        .getRestaurant(route.get("id"))
        .forEach(restaurant => {
          this.restaurant = restaurant;
        });
    });
    this.restaurantService.getRestaurantsItems().subscribe(items => {
      this.items = items.filter(
        item => item.restaurant_id === this.restaurant.id
      );
    });
    this.checkoutService.items().subscribe(items => {
      this.numItemsInCheckout = items.length;
    });
  }

  myOrders() {
    this.router.navigateByUrl("/my-orders");
  }

  checkout() {
    this.router.navigateByUrl("/checkout");
  }

  onSelect = async (item: any) => {
    const toast = await this.toastController.create({
      message: "Item added to cart.",
      duration: 3000,
      color: "tertiary",
      position: "bottom"
    });
    toast.present();
    this.checkoutService.addItem({
      ...item,
      restaurant_id: this.restaurant.id
    });
  };
}
