import { AbstractParser } from "./parser";
import { Injectable } from "@angular/core";
import { Notification } from 'app/ui/models/notification/notification';

@Injectable()
export class NotificationParser extends AbstractParser<Notification> {

    parse(payload): Notification {
        const notification: Notification = new Notification();
        if(!payload) return notification;

        const info = payload.val();

        notification.key = payload.key;
        notification.userApp = info.userApp;
        notification.message = info.message;
        notification.read = info.read;
        return notification;
    }
}