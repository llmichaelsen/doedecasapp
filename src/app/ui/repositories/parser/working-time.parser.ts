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
        workingTime.weekEndBegin = info.weekEndBegin.substring(0, 5) || '';
        workingTime.weekEndFinal = info.weekEndFinal.substring(0, 5) || '';
        workingTime.weekDayBegin = info.weekDayBegin.substring(0, 5) || '';
        workingTime.weekDayFinal = info.weekDayFinal.substring(0, 5) || '';
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
        workingTime.weekEndBegin = info.weekEndBegin.substring(0, 5) || '';
        workingTime.weekEndFinal = info.weekEndFinal.substring(0, 5) || '';
        workingTime.weekDayBegin = info.weekDayBegin.substring(0, 5) || '';
        workingTime.weekDayFinal = info.weekDayFinal.substring(0, 5) || '';
        return workingTime;
    }
}