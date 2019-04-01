import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  Restaurant,
  RestaurantService,
  Item
} from "src/app/services/restaurant.service";
import { Router } from "@angular/router";


@Component({
  selector: 'app-owner-menu',
  templateUrl: './owner-menu.page.html',
  styleUrls: ['./owner-menu.page.scss'],
})

export class OwnerMenuPage implements OnInit {
  items: Item [] = [];
  restaurant: Restaurant = {
    id:"",    
    img: "",
    name: "",
    owner_id: ""
  }
 

  constructor(
    private activatedRoute: ActivatedRoute,
    private restaurantService: RestaurantService,
    private router: Router
  ) {}

  createItem = (id: string) => {
    
    this.router.navigateByUrl(`/owner-menu/${id}/create-item`);
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
      this.items = items;
    });
  }
}
