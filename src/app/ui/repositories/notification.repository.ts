import { filter, map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { Observable } from "rxjs";
import { FirebaseGateway } from "../gateway/firebase.gateway";
import { Notification } from "../models/notification/notification";
import { NotificationParser } from "./parser/notification.parser";
@Injectable()
export class NotificationRepository {
  constructor(
    private db: AngularFireDatabase,
    private parser: NotificationParser
  ) {}

  public async saveNotification(notification: Notification): Promise<any> {
    try {
      const gateway = new FirebaseGateway(this.db);
      const result = await gateway.addCustomItemInList(
        "notification",
        notification,
        notification.userApp
      );
      return Promise.resolve(result);
    } catch (error) {
      return await Promise.reject(error);
    }
  }

  public getUnreadNotifications(userApp: string): Observable<any> {
    try {
      const gateway = new FirebaseGateway(this.db);
      return gateway
        .getListObservable(`notification/${userApp}`)
        .pipe(
          map((changes) =>
            changes
              .map((c: any) => this.parser.parse(c.payload))
              .filter((item) => item.read === false)
          )
        );
    } catch (error) {
      return error;
    }
  }

  public async readAllNotifications(userApp: string): Promise<any> {
    try {
      const gateway = new FirebaseGateway(this.db);
      const result = this.parser
        .parseList(await gateway.getList(`notification/${userApp}`))
        .filter((n) => n.read === false);

      result.forEach(async (not) => {
        not.read = true;
        await gateway.updateItem(`notification/${userApp}`, not);
      });
      return Promise.resolve(true);
    } catch (error) {
      return await Promise.reject(error);
    }
  }
}
