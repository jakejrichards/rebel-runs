import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

export interface Restaurant {
  id: string;
  img: string;
  name: string;
  owner_id: string;
}

export interface Item {
  name: string;
  price: number;
  description: string;
  restaurant_id: string;
}

export interface Order {
  items: Item[];
  customer: {
    firstName: string;
    lastName: string;
  };
  address: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    zip: number;
  };
  customer_id: string;
  restaurant_id: string;
  total: number;
}

@Injectable({
  providedIn: "root"
})
export class RestaurantService {
  orders: AngularFirestoreCollection<Order>;
  restaurants: AngularFirestoreCollection<Restaurant>;

  constructor(db: AngularFirestore) {
    this.orders = db.collection("orders");
    this.restaurants = db.collection("restaurants");
  }

  createOrder(order: Order) {
    return this.orders.add(order);
  }

  createRestaurant(restaurantData: Omit<Restaurant, "id">) {
    return this.restaurants.add(restaurantData as any);
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
    return this.restaurants
      .doc<Restaurant>(id)
      .snapshotChanges()
      .pipe(
        map(({ payload }) => ({
          id: payload.id,
          ...payload.data()
        }))
      );
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
