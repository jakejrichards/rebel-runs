import { Component, OnInit } from '@angular/core';
import { RestaurantService, Restaurant } from "src/app/services/restaurant.service";
import { AuthService } from "src/app/services/auth.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.page.html',
  styleUrls: ['./create-item.page.scss'],
})
export class CreateItemPage implements OnInit {
  img = "";
  name = "";
  description = "";
  price = "";
  restaurant: Restaurant;
  
  defaultImg = "https://place-hold.it/300x200";


  constructor( 
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
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
  }
  createItem = () => {
    
      return this.restaurantService
        .createRestaurantItem({
          name: this.name,
          description: this.description,
          price: this.price,
          img: this.img || this.defaultImg,
          owner_id: `owner.${this.authService.user.uid}`,
          restaurant_id: this.restaurant.id
        })
        .then(() => this.router.navigateByUrl(`/owner-menu/${this.restaurant.id}`));
    };
  }
  
