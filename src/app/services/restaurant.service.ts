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
  price: number;
  rating: number;
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
  approved: boolean;
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

  async createOrder(order: Order) {
    await this.orders.add(order);
    this.getRestaurant(order.restaurant_id).forEach(({ owner_id, name }) => {
      return this.createMessage({
        user_id: _.trimStart(owner_id, "owner."),
        text: `${order.customer.firstName} ${
          order.customer.lastName
        } has placed a $${order.total} order for ${name}!`,
        created_at: new Date().toISOString()
      });
    });
  }

  async approveOrder(order: Order) {
    await this.orders
      .doc<Order>((order as any).id)
      .set({ ...order, approved: true });
    this.getRestaurant(order.restaurant_id).forEach(({ name }) => {
      return this.createMessage({
        user_id: _.trimStart(order.customer_id, "customer."),
        text: `Your order for ${name} was approved!`,
        created_at: new Date().toISOString()
      });
    });
  }

  async rejectOrder(order: Order) {
    await this.orders.doc((order as any).id).delete();
    this.getRestaurant(order.restaurant_id).forEach(({ name }) => {
      return this.createMessage({
        user_id: _.trimStart(order.customer_id, "customer."),
        text: `Your order for ${name} was rejected!`,
        created_at: new Date().toISOString()
      });
    });
  }

  createMessage(messageData: Omit<Message, "id">) {
    return this.messages.add(messageData);
  }

  deleteMessage(id: string) {
    return this.messages.doc(id).delete();
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

  async claimOrder(order: Order, driver_id: string) {
    await this.orders.doc<Order>((order as any).id).update({ driver_id });
    this.getRestaurant(order.restaurant_id).forEach(({ name }) => {
      return this.createMessage({
        user_id: _.trimStart(order.customer_id, "customer."),
        text: `Your order for ${name} was picked up by the driver!`,
        created_at: new Date().toISOString()
      });
    });
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
