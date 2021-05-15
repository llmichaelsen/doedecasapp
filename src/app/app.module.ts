import { ServiceModule } from "./ui/services/service.module";
import { RepositoryModule } from "./ui/repositories/repository.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"; // this is needed!
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app.routing";
import { ComponentsModule } from "./components/components.module";
import { ExamplesModule } from "./examples/examples.module";

import { AppComponent } from "./app.component";
import { NavbarComponent } from "./shared/navbar/navbar.component";
import { MaterialModule } from "./core/material/material.module";
import { ParserModule } from "./ui/repositories/parser/parser.module";
import { ProfileDonatorComponent } from "./ui/pages/profile-donator/profile-donator.component";
import { InstitutionsComponent } from "./ui/pages/institutions/institutions.component";
import { ProfileInstitutionComponent } from "./ui/pages/profile-institution/profile-institution.component";
import { AngularFireModuleModule } from "./core/material/angular-fire.module";
import { CreditsComponent } from './ui/pages/credits/credits.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProfileDonatorComponent,
    InstitutionsComponent,
    ProfileInstitutionComponent,
    CreditsComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModuleModule,
    RouterModule,
    AppRoutingModule,
    ComponentsModule,
    ExamplesModule,
    MaterialModule,
    ParserModule.forRoot(),
    RepositoryModule.forRoot(),
    ServiceModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
