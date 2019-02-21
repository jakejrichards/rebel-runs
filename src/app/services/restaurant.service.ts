import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export interface Restaurant {
  id: string;
  name: string;
  owner_id: string;
}

@Injectable({
  providedIn: "root"
})
export class RestaurantService {
  restaurants: Observable<Restaurant[]>;

  constructor(private db: AngularFirestore) {
    this.restaurants = db
      .collection<Restaurant>("restaurants")
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(({ payload: { doc } }) => ({
            ...doc.data(),
            id: doc.id
          }))
        )
      );
  }

  getRestaurants() {
    return this.restaurants;
  }
}
