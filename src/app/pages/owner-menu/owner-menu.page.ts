import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  Restaurant,
  RestaurantService,
  Item
} from "src/app/services/restaurant.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-owner-menu",
  templateUrl: "./owner-menu.page.html",
  styleUrls: ["./owner-menu.page.scss"]
})
export class OwnerMenuPage implements OnInit {
  items: Item[] = [];
  restaurant: Restaurant = {
    id: "",
    img: "",
    name: "",
    pnumber: "",
    address: "",
    owner_id: "",
    cuisine_type: ""
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private restaurantService: RestaurantService,
    private router: Router
  ) {}

  createItem = (id: string) => {
    this.router.navigateByUrl(`/owner-menu/${id}/create-item`);
  };

  editItem = (id: string) => {
    this.router.navigateByUrl(`edit-item/${id}`);
  };

  deleteItem = (id: string) => {
    this.restaurantService.deleteItem(id);
  };

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
  }
}
