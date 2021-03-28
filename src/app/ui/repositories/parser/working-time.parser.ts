import { WorkingTime } from './../../models/user/working-time.model';
import { AbstractParser } from "./parser";
import { Injectable } from "@angular/core";

@Injectable()
export class WorkingTimeParser extends AbstractParser<WorkingTime> {

    parse(payload): WorkingTime {
        const workingTime: WorkingTime = new WorkingTime();
        if(!payload) return workingTime;

        const info: any = payload;

        workingTime.monday = info.monday;
        workingTime.tuesday = info.tuesday;
        workingTime.wednesday = info.wednesday;
        workingTime.thursday = info.thursday;
        workingTime.friday = info.friday;
        workingTime.saturday = info.saturday;
        workingTime.sunday = info.sunday;
        workingTime.weekEndBegin = info.weekEndBegin || null;
        workingTime.weekEndFinal = info.weekEndFinal || null;
        workingTime.weekDayBegin = info.weekDayBegin || null;
        workingTime.weekDayFinal = info.weekDayFinal || null;
        return workingTime;
    }

    reparse(payload): WorkingTime {
        const workingTime: WorkingTime = new WorkingTime();
        if(!payload) return workingTime;

        const info: any = payload;

        workingTime.monday = info.monday;
        workingTime.tuesday = info.tuesday;
        workingTime.wednesday = info.wednesday;
        workingTime.thursday = info.thursday;
        workingTime.friday = info.friday;
        workingTime.saturday = info.saturday;
        workingTime.sunday = info.sunday;
        workingTime.weekEndBegin = info.weekEndBegin;
        workingTime.weekEndFinal = info.weekEndFinal;
        workingTime.weekDayBegin = info.weekDayBegin;
        workingTime.weekDayFinal = info.weekDayFinal;
        return workingTime;
    }
}