import * as _ from "lodash";
import * as moment from "moment";
import { Component, OnInit } from "@angular/core";
import {
  Message,
  RestaurantService
} from "src/app/services/restaurant.service";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-messages",
  templateUrl: "./messages.page.html",
  styleUrls: ["./messages.page.scss"]
})
export class MessagesPage implements OnInit {
  messages: Message[];

  constructor(
    private authService: AuthService,
    private restaurantService: RestaurantService
  ) {}

  deleteMessage(id: string) {
    return this.restaurantService.deleteMessage(id);
  }

  ngOnInit() {
    this.restaurantService.getMessages().subscribe(messages => {
      this.messages = _.sortBy(
        messages.filter(
          message => message.user_id === this.authService.user.uid
        ),
        "created_at"
      ).map(message => ({
        ...message,
        created_at: moment(message.created_at).format("LLL")
      }));
    });
  }
}
