import { Component, OnInit } from "@angular/core";
import { RestaurantService } from "src/app/services/restaurant.service";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-create-restaurant",
  templateUrl: "./create-restaurant.page.html",
  styleUrls: ["./create-restaurant.page.scss"]
})
export class CreateRestaurantPage implements OnInit {
  img = "";
  pnumber = "";
  address = "";
  name = "";
  defaultImg = "https://place-hold.it/300x200";
  cuisine_type = "";
  price = 1;
  rating = 1;

  constructor(
    private authService: AuthService,
    private restaurantService: RestaurantService,
    private router: Router
  ) {}

  ngOnInit() {}

  create = () => {
    return this.restaurantService
      .createRestaurant({
        name: this.name,
        img: this.img || this.defaultImg,
        address: this.address,
        pnumber: this.pnumber,
        owner_id: `owner.${this.authService.user.uid}`,
        cuisine_type: this.cuisine_type,
        price: this.price,
        rating: this.rating
      })
      .then(() => this.router.navigateByUrl("/owner"));
  };
}
