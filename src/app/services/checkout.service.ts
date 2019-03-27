import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CheckoutService {
  private _items: BehaviorSubject<any[]> = new BehaviorSubject([]);

  constructor() {}

  items() {
    return this._items.asObservable();
  }

  addItem(item: any) {
    const updated = [...this._items.getValue(), item];
    this._items.next(updated);
  }
}
