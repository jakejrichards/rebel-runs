import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", loadChildren: "./pages/home/home.module#HomePageModule" },
  { path: "login", loadChildren: "./pages/login/login.module#LoginPageModule" },
  {
    path: "create-restaurant",
    loadChildren:
      "./pages/create-restaurant/create-restaurant.module#CreateRestaurantPageModule"
  },
  {
    path: "restaurants",
    loadChildren: "./pages/restaurants/restaurants.module#RestaurantsPageModule"
  },
  {
    path: "restaurants/:id",
    loadChildren: "./pages/restaurant/restaurant.module#RestaurantPageModule"
  },
  { path: "owner", loadChildren: "./pages/owner/owner.module#OwnerPageModule" },
  {
    path: "driver",
    loadChildren: "./pages/driver/driver.module#DriverPageModule"
  },
  {
    path: "checkout",
    loadChildren: "./pages/checkout/checkout.module#CheckoutPageModule"
  },
  {
    path: "my-orders",
    loadChildren: "./pages/my-orders/my-orders.module#MyOrdersPageModule"
  },
  {
    path: "owner-menu/:id/create-item",
    loadChildren: "./pages/create-item/create-item.module#CreateItemPageModule"
  },
  {
    path: "owner-menu/:id",
    loadChildren: "./pages/owner-menu/owner-menu.module#OwnerMenuPageModule"
  },
  {
    path: "messages",
    loadChildren: "./pages/messages/messages.module#MessagesPageModule"
  },
  {
    path: "edit-restaurant/:id",
    loadChildren:
      "./pages/edit-restaurant/edit-restaurant.module#EditRestaurantPageModule"
  },
  {
    path: "edit-item/:id",
    loadChildren: "./pages/edit-item/edit-item.module#EditItemPageModule"
  },
  { path: 'owner-orders', loadChildren: './pages/owner-orders/owner-orders.module#OwnerOrdersPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
