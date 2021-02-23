import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { UserApp } from 'app/ui/models/user/user-app.model';

@Injectable({
  providedIn: 'root'
})
export class AuthRepository {
  
  constructor(
    public afAuth: AngularFireAuth
    ) {}

  authenticate(email, password) :Promise<firebase.auth.UserCredential> {
    return new Promise((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(email, password)
        .then((result) => resolve(result))
        .catch(error => reject(error))
    }) 
  }
    
  async register(user: UserApp): Promise<firebase.auth.UserCredential> {
    return new Promise((resolve, reject) => {
        this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
            .then(e => resolve(e))
            .catch(error => reject(error));
    });
  }

  unRegister(email, password) {
    return new Promise((resolve, reject) => {
      let firebase = this.afAuth;
      firebase.signInWithEmailAndPassword(email, password)
        .then(async ()  => {
          var user = await firebase.currentUser;
          user.delete();
          resolve('');
        })
        .catch(error => reject(error));
    });
  }


}