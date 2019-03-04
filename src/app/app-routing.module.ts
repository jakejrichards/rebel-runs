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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
