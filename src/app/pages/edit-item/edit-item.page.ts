import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { RestaurantService, Item } from "src/app/services/restaurant.service";

@Component({
  selector: "app-edit-item",
  templateUrl: "./edit-item.page.html",
  styleUrls: ["./edit-item.page.scss"]
})
export class EditItemPage implements OnInit {
  item: Item = {
    img: "",
    name: "",
    price: 0,
    cooktime: 0,
    description: "",
    restaurant_id: "",
    owner_id: ""
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private restaurantService: RestaurantService,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(route => {
      this.restaurantService
        .getRestaurantItem(route.get("id"))
        .forEach(item => {
          this.item = item;
        });
    });
  }

  save() {
    this.restaurantService
      .updateItem(this.item)
      .then(() =>
        this.router.navigateByUrl(`/owner-menu/${this.item.restaurant_id}`)
      );
  }
}
