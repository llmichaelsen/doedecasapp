import { Time } from '@angular/common';

export class DeliveryTime {
    day: number;
    initTime: Time;
    endTime: Time;

    formatedTime(): string {
        return `${this.initTime} até ${this.endTime}`;
    }
}
