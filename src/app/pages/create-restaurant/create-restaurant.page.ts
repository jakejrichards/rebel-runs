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
  name = "";
  defaultImg = "https://place-hold.it/300x200";

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
        owner_id: `owner.${this.authService.user.uid}`
      })
      .then(() => this.router.navigateByUrl("/restaurants"));
  };
}
