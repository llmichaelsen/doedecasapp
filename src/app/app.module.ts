import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { ExamplesModule } from './examples/examples.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { firebaseConfig } from 'environments/credentials';
import { MaterialModule } from './core/material/material.module';
import { UserService } from './ui/services/user.service';
import { UserRepository } from './ui/repositories/user.repository';
import { ParserModule } from './ui/repositories/parser/parser.module';
import { LoginComponent } from './ui/pages/login/login.component';
import { ProfileComponent } from './examples/profile/profile.component';
import { LoadingService } from './ui/services/loading.service';
import { RegisterComponent } from './ui/page/register/register.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        LoginComponent,
        ProfileComponent,
        RegisterComponent
    ],
    imports: [
        BrowserAnimationsModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        AppRoutingModule,
        ComponentsModule,
        ExamplesModule,
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFirestoreModule,
        AngularFireAuthModule,
        AngularFireStorageModule,
        MaterialModule,
        ParserModule.forRoot()
    ],
    providers: [
        AngularFireAuth,
        UserService,
        UserRepository,
        LoadingService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
