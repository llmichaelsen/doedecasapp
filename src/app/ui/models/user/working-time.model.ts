import { Time } from "@angular/common";

export class WorkingTime {

    monday: boolean = false;
    tuesday: boolean = false;
    wednesday: boolean = false;
    thursday: boolean = false;
    friday: boolean = false;
    saturday: boolean = false;
    sunday: boolean = false;

    weekEndBegin: Time;
    weekEndFinal: Time;

    weekDayBegin: Time;
    weekDayFinal: Time;

}