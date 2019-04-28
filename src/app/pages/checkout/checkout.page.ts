import * as _ from "lodash";
import { Component, OnInit } from "@angular/core";
import { CheckoutService } from "src/app/services/checkout.service";
import {
  RestaurantService,
  Restaurant
} from "src/app/services/restaurant.service";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { AlertController, ToastController } from "@ionic/angular";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.page.html",
  styleUrls: ["./checkout.page.scss"]
})
export class CheckoutPage implements OnInit {
  total = 0;
  items = [];
  restaurant: Restaurant = {
    id: "",
    owner_id: "",
    img: "",
    address: "",
    pnumber: "",
    name: "",
    cuisine_type: "",
    price: 0,
    rating: 0
  };
  firstName = "";
  lastName = "";
  addressLine1 = "";
  addressLine2 = "";
  city = "";
  state = "";
  zip = "";

  constructor(
    private alertController: AlertController,
    private authService: AuthService,
    private checkoutService: CheckoutService,
    private restaurantService: RestaurantService,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.checkoutService.items().subscribe(items => {
      if (!items.length) {
        this.items = items;
        return;
      }
      const [{ restaurant_id }] = items;
      this.restaurantService
        .getRestaurant(restaurant_id)
        .forEach(restaurant => {
          this.restaurant = restaurant;
        });
      this.total = Math.floor(_.sum(items.map(item => item.price)) * 100) / 100;
      this.items = items;
    });
  }

  checkout() {
    this.router.navigateByUrl("/checkout");
  }

  myOrders() {
    this.router.navigateByUrl("/my-orders");
  }

  backToRestaurants() {
    this.router.navigateByUrl("/restaurants");
  }

  moreItems() {
    this.router.navigateByUrl(`restaurants/${this.restaurant.id}`);
  }

  getMissingFields() {
    return _.omit(_.pickBy(this, item => !item), "addressLine2");
  }

  remove(item: any) {
    this.checkoutService.removeItem(item);
  }

  async placeOrder() {
    const missingFields = this.getMissingFields();
    if (!_.isEmpty(missingFields)) {
      const alert = await this.alertController.create({
        header: "Missing Fields",
        message: _.keys(missingFields).join(", ")
      });
      await alert.present();
      return;
    }
    return this.restaurantService
      .createOrder({
        customer: {
          firstName: this.firstName,
          lastName: this.lastName
        },
        address: {
          line1: this.addressLine1,
          line2: this.addressLine2,
          city: this.city,
          state: this.state,
          zip: parseInt(this.zip)
        },
        status: "preparing",
        items: this.items,
        total: this.total,
        customer_id: `customer.${this.authService.user.uid}`,
        restaurant_id: this.restaurant.id,
        placed_at: new Date().toISOString(),
        driver_id: ""
      })
      .then(async () => {
        this.items = [];
        const toast = await this.toastController.create({
          message: "Order Submitted",
          duration: 10000,
          color: "success"
        });
        return toast.present();
      });
  }
}
