import { FormGroup, FormBuilder } from '@angular/forms';
import { Time } from "@angular/common";

export class WorkingTime {
  
  monday: boolean = false;
  tuesday: boolean = false;
  wednesday: boolean = false;
  thursday: boolean = false;
  friday: boolean = false;
  saturday: boolean = false;
  sunday: boolean = false;

  weekEndBegin: Time = null;
  weekEndFinal: Time = null;

  weekDayBegin: Time = null;
  weekDayFinal: Time = null;

  workOnWeekend(): boolean {
    return this.saturday || this.sunday ? true : false;
  }

  getDayList(): string[] {
     let result = [];
     this.monday ? result.push("Segunda-feira") : null;
     this.tuesday ? result.push("Terça-feira") : null;
     this.wednesday ? result.push("Quarta-feira") : null;
     this.thursday ? result.push("Quinta-feira") : null;
     this.friday ? result.push("Sexta-feira") : null;
     this.saturday ? result.push("Sábado") : null;
     this.sunday ? result.push("Domingo") : null;
     return result
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
