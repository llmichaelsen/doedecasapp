import { Time } from "@angular/common";

export class WorkingTime {
  key: string;
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

  workOnWeekend(): boolean {
    return this.saturday || this.sunday ? true : false;
  }

  workOnWeekday(): boolean {
    return this.monday ||
      this.tuesday ||
      this.wednesday ||
      this.thursday ||
      this.friday
      ? true
      : false;
  }
}
