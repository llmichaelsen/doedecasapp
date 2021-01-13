
import { firebaseConfig } from './../../../environments/credentials';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { NgModule } from "@angular/core";
import { AngularFireModule } from '@angular/fire';

@NgModule({
  declarations: [],
  imports: [      
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
  ],
  providers: [
    AngularFireAuth
  ]
})
export class AngularFireModuleModule {}
