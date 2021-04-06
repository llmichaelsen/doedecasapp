import { Observable } from 'rxjs';

import { Injectable } from "@angular/core";
import { Notification } from "../models/notification/notification";
import { NotificationRepository } from "../repositories/notification.repository";

@Injectable()
export class NotificationService {
  constructor(private repository: NotificationRepository) {}

  public async saveNotification(notification: Notification): Promise<any> {
    try {
      const rsult = await this.repository.saveNotification(notification);
      return rsult;
    } catch (error) {
      return error;
    }
  }

  public getUnreadNotifications(userApp: string): Observable<Notification[]> {
    try {
      const rsult = this.repository.getUnreadNotifications(userApp);
      return rsult;
    } catch (error) {
      return error;
    }
  }
  
  public async readAllNotifications(userApp: string): Promise<any> {
    try {
      const rsult = await this.repository.readAllNotifications(userApp);
      return rsult;
    } catch (error) {
      return error;
    }
  }
}
