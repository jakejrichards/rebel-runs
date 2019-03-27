import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AlertController } from "@ionic/angular";

@Injectable({
  providedIn: "root"
})
export class CheckoutService {
  private _items: BehaviorSubject<any[]> = new BehaviorSubject([]);

  constructor(private alertController: AlertController) {}

  items() {
    return this._items.asObservable();
  }

  addItem(item: any) {
    const items = this._items.getValue();
    if (items.length && items[0].restaurant_id !== item.restaurant_id) {
      return this.alertController
        .create({
          header: "Unable to add item to cart!",
          message: "You already have items from a different restaurant.",
          buttons: [
            {
              text: "Empty Cart and add item",
              handler: () => this._items.next([item])
            },
            {
              text: "Okay"
            }
          ]
        })
        .then(alert => alert.present());
    }
    this._items.next([...items, item]);
  }
}
