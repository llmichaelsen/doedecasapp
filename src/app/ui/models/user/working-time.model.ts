import { FormGroup, FormBuilder } from '@angular/forms';
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

  getFormGroup(): FormGroup {
    const fb = new FormBuilder();
    return fb.group({
      monday: [this.monday],
      tuesday: [this.tuesday],
      wednesday: [this.wednesday],
      thursday: [this.thursday],
      friday: [this.friday],
      saturday: [this.saturday],
      sunday: [this.sunday],
      weekEndBegin: [this.weekEndBegin],
      weekEndFinal: [this.weekEndFinal],
      weekDayBegin: [this.weekDayBegin],
      weekDayFinal: [this.weekDayFinal],
    })
  }
}
