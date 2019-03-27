import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export interface Restaurant {
  img: string;
  name: string;
  owner_id: string;
}

interface Order {
  items: any[];
  restaurant_id: string;
  total: number;
}

@Injectable({
  providedIn: "root"
})
export class RestaurantService {
  orders: AngularFirestoreCollection<Order>;
  restaurants: AngularFirestoreCollection<Restaurant>;

  constructor(private db: AngularFirestore) {
    this.orders = db.collection("orders");
    this.restaurants = db.collection("restaurants");
  }

  createOrder(order: Order) {
    return this.orders.add(order);
  }

  createRestaurant(restaurantData: Restaurant) {
    return this.restaurants.add(restaurantData);
  }

  getOrders() {
    return this.orders.snapshotChanges().pipe(
      map(changes =>
        changes.map(({ payload: { doc } }) => ({
          ...doc.data(),
          id: doc.id
        }))
      )
    );
  }

  getRestaurant(id: string) {
    return this.restaurants.doc<Restaurant>(id);
  }

  getRestaurants(): Observable<Restaurant[]> {
    return this.restaurants.snapshotChanges().pipe(
      map(changes =>
        changes.map(({ payload: { doc } }) => ({
          ...doc.data(),
          id: doc.id
        }))
      )
    );
  }
}
