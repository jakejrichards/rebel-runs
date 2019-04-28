import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import * as _ from "lodash";

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

export interface Restaurant {
  id: string;
  img: string;
  name: string;
  pnumber: string;
  address: string;
  owner_id: string;
  cuisine_type: string;
}

export interface Message {
  user_id: string;
  text: string;
  created_at: string;
}

export interface Item {
  name: string;
  price: number;
  cooktime: number;
  description: string;
  restaurant_id: string;
  owner_id: string;
  img: string;
}

export interface Order {
  placed_at: string;
  items: Item[];
  status: string;
  customer: {
    firstName: string;
    lastName: string;
  };
  restaurant?: Restaurant;
  address: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    zip: number;
  };
  customer_id: string;
  restaurant_id: string;
  driver_id: string;
  total: number;
}

@Injectable({
  providedIn: "root"
})
export class RestaurantService {
  messages: AngularFirestoreCollection<Message>;
  orders: AngularFirestoreCollection<Order>;
  restaurants: AngularFirestoreCollection<Restaurant>;
  items: AngularFirestoreCollection<Item>;

  constructor(db: AngularFirestore) {
    this.orders = db.collection("orders");
    this.restaurants = db.collection("restaurants");
    this.items = db.collection("items");
    this.messages = db.collection("messages");
  }

  createOrder(order: Order) {
    return this.orders.add(order);
  }

  createRestaurant(restaurantData: Omit<Restaurant, "id">) {
    return this.restaurants.add(restaurantData as any);
  }

  createRestaurantItem(restaurantData: Item) {
    return this.items.add(restaurantData);
  }
  getRestaurantItem(id: string) {
    return this.items
      .doc<Item>(id)
      .snapshotChanges()
      .pipe(
        map(({ payload }) => ({
          id: payload.id,
          ...payload.data()
        }))
      );
  }

  getRestaurantsItems(): Observable<Item[]> {
    return this.items.snapshotChanges().pipe(
      map(changes =>
        changes.map(({ payload: { doc } }) => ({
          ...doc.data(),
          id: doc.id
        }))
      )
    );
  }

  getMessages(): Observable<Message[]> {
    return this.messages.snapshotChanges().pipe(
      map(changes =>
        changes.map(({ payload: { doc } }) => ({
          ...doc.data(),
          id: doc.id
        }))
      )
    );
  }

  claimOrder(order_id: string, driver_id: string) {
    this.orders.doc<Order>(order_id).update({ driver_id });
  }

  updateItem(item: Item) {
    return this.items.doc((item as any).id).set(_.omit(item, ["id"]));
  }

  deleteItem(id: string) {
    return this.items.doc(id).delete();
  }

  updateOrder(order: Order) {
    return this.orders.doc((order as any).id).set(_.omit(order, ["id"]));
  }

  updateRestaurant(restaurant: Restaurant) {
    return this.restaurants.doc(restaurant.id).set(_.omit(restaurant, ["id"]));
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
