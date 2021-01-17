import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { ComponentsComponent } from "./components/components.component";
import { LandingComponent } from "./examples/landing/landing.component";
import { ProfileComponent } from "./examples/profile/profile.component";
import { NucleoiconsComponent } from "./components/nucleoicons/nucleoicons.component";
import { InstitutionsComponent } from "./ui/pages/institutions/institutions.component";
import { UserPageComponent } from "./ui/pages/user-page/user-page.component";
import { MinhasDoacoesComponent } from "./ui/pages/minhas-doacoes/minhas-doacoes.component";
import { RatingComponent } from "./ui/pages/rating/rating.component";

const routes: Routes = [
  { path: "", redirectTo: "index", pathMatch: "full" },
  { path: "index", component: ComponentsComponent },
  { path: "nucleoicons", component: NucleoiconsComponent },
  { path: "examples/landing", component: LandingComponent },
  { path: "instituicoes", component: InstitutionsComponent },
  {
    path: "login",
    loadChildren: () =>
      import("./ui/pages/login/login.module").then(
        (module) => module.LoginModule
      ),
  },
  {
    path: "register",
    loadChildren: () =>
      import("./ui/pages/register/register.module").then(
        (module) => module.RegisterModule
      ),
  },
  {
    path: "map",
    loadChildren: () =>
      import("./ui/pages/map/map.module").then(
        (module) => module.MapModule
      ),
  },
  { path: "minhas-doacoes", component: MinhasDoacoesComponent },
  { path: "perfil", component: ProfileComponent },
  { path: "avaliacao", component: RatingComponent },
  { path: "perfil/:id", component: UserPageComponent },
];

@NgModule({
  imports: [CommonModule, BrowserModule, RouterModule.forRoot(routes)],
  exports: [],
})
export class AppRoutingModule {}
