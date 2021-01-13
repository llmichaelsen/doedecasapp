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
import { ProfileComponent } from "./examples/profile/profile.component";
import { InstitutionsComponent } from "./ui/pages/institutions/institutions.component";
import { UserPageComponent } from "./ui/pages/user-page/user-page.component";
import { MinhasDoacoesComponent } from "./ui/pages/minhas-doacoes/minhas-doacoes.component";
import { RatingComponent } from "./ui/pages/rating/rating.component";
import { AngularFireModuleModule } from "./core/material/angular-fire.module";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProfileComponent,
    InstitutionsComponent,
    UserPageComponent,
    MinhasDoacoesComponent,
    RatingComponent,
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
