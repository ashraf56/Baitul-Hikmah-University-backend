import { TSchedule } from "./OfferedCourse.interface";


export const timeConflict = (assignedSchedules: TSchedule[], newSchedule: TSchedule) => {

    for (const time of assignedSchedules) {
        const existingStarttime = new Date(`2000T${time.startTime}`)
        const newStarttime = new Date(`2000T${newSchedule.startTime}`)
        const existingEndtime = new Date(`2000T${time.endTime}`)
        const newEndtime = new Date(`2000T${newSchedule.endTime}`)

        // 10:00 12:00 
        // 10:30   11:00 (new time)

        //  10:30           12:00              11:00             10:00 

        if (newStarttime < existingEndtime && newEndtime > existingStarttime) {
            return true
        }
    }
    return false
}