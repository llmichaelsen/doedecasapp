import { RegisterInstitutionComponent } from './register-institution/register-institution.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RegisterComponent } from "./register.component";

const routes: Routes = [
  { path: "", component: RegisterComponent },
  { path: "institution", component: RegisterInstitutionComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterRoutingModule {}
