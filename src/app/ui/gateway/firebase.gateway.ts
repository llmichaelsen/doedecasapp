import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import "rxjs/add/operator/map";
import "rxjs/add/operator/first";
import * as firebase from "firebase";
import { Observable } from "rxjs";

export class FirebaseGateway {
  constructor(private db: AngularFireDatabase) {}

  async addItem(list: string, item: any): Promise<any> {
    console.log(item);
    return new Promise((resolve, reject) => {
      this.db
        .list(list)
        .push(item)
        .then((r) => {
          resolve(r);
        })
        .catch((error) => reject(error));
    });
  }

  async addCustomItem(list: string, item: any, key: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.database
        .ref(list)
        .child(key)
        .set(item)
        .then((r) => {
          resolve(r);
        })
        .catch((error) => reject(error));
    });
  }

  async addCustomItemInList(
    list: string,
    item: any,
    key: string
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.database
        .ref(list)
        .child(key)
        .push(item)
        .then((r) => {
          resolve(r);
        })
        .catch((error) => reject(error));
    });
  }

  updateItem(list: string, item: any) {
    const ref = firebase.database().ref(list + "/" + item.key);
    const obj = item.getUpdateObject();
    return new Promise((resolve, reject) => {
      ref
        .update(obj)
        .then((r) => {
          resolve(r);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  getList(list: string) {
    return new Promise((resolve, reject) => {
      this.db
        .list(list)
        .snapshotChanges()
        .first()
        .toPromise()
        .then((r: Array<any>) => resolve(r.map((item) => item.payload)))
        .catch((error) => reject(error));
    });
  }

  getListObservable(list: string): Observable<any> {
    return this.db
      .list(list)
      .snapshotChanges();
  }

  deleteItem(list: string, key: string) {
    return new Promise((resolve, reject) => {
      this.db
        .list(list)
        .remove(key)
        .then((r) => {
          resolve(r);
        })
        .catch((error) => reject(error));
    });
  }

  getItemByKey(list, key): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.database
        .ref(list)
        .child(key)
        .once("value")
        .then((r) => resolve(r))
        .catch((e) => reject(e));
    });
  }

  getItem(list, column, value): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db
        .list(list, (ref) =>
          ref.orderByChild(column).equalTo(value).limitToFirst(1)
        )
        .snapshotChanges()
        .first()
        .toPromise()
        .then((r) => resolve(r))
        .catch((e) => reject(e));
    });
  }
}
