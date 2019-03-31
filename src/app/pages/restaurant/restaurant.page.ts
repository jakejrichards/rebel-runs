import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  Restaurant,
  RestaurantService
} from "src/app/services/restaurant.service";
import { CheckoutService } from "src/app/services/checkout.service";

@Component({
  selector: "app-restaurant",
  templateUrl: "./restaurant.page.html",
  styleUrls: ["./restaurant.page.scss"]
})
export class RestaurantPage implements OnInit {
  restaurant: Restaurant = {
    id: "",
    img: "",
    name: "",
    owner_id: ""
  };

  numItemsInCheckout = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private checkoutService: CheckoutService,
    private restaurantService: RestaurantService,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(route => {
      this.restaurantService
        .getRestaurant(route.get("id"))
        .forEach(restaurant => {
          this.restaurant = restaurant;
        });
    });
    this.checkoutService.items().subscribe(items => {
      this.numItemsInCheckout = items.length;
    });
  }

  items = [
    { name: "French Fries", price: 0.99, description: "Animal style fries." },
    { name: "Cheeseburger", price: 1.99, description: "Yeet." },
    { name: "Pizza", price: 2.99, description: "pepperoni" },
    { name: "Olives", price: 1.39, description: "Animal style fries." },
    { name: "Spaghetti", price: 3.69, description: "Animal style fries." }
  ];

  myOrders() {
    this.router.navigateByUrl("/my-orders");
  }

  checkout() {
    this.router.navigateByUrl("/checkout");
  }

  onSelect = (item: any) => {
    this.checkoutService.addItem({
      ...item,
      restaurant_id: this.restaurant.id
    });
  };
}
