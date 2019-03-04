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

@Injectable({
  providedIn: "root"
})
export class RestaurantService {
  restaurants: AngularFirestoreCollection<Restaurant>;

  constructor(private db: AngularFirestore) {
    this.restaurants = db.collection("restaurants");
  }

  createRestaurant(restaurantData: Restaurant) {
    return this.restaurants.add(restaurantData);
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
