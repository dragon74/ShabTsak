import { format } from 'date-fns';

export const hourArr = Array.from({ length: 24 }, (_, index) => {
    const hour = (index + 1).toString();
    return hour;
});

export const daysOfWeekHebrew = [
    'ראשון',
    'שני',
    'שלישי',
    'רביעי',
    'חמישי',
    'שישי',
    'שבת',
];

export const daysStr = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

//function get dayNumber and return it as a string
export const getDayOfWeekHebrew = (number) => {
    if (number >= 1 && number <= 7) {
        return daysOfWeekHebrew[number - 1];
    } else {
        return 'Invalid day number';
    }
};

export const getTimeStr = (hour) => {
    let hourstr = "";
    if(hour != undefined){
        hourstr = format(new Date().setHours(hour, 0, 0, 0), 'HH:mm')
    }
    return hourstr;
}

export const getDayStr = (day) => {
    let dayStr = "";
    if(day != undefined){
        dayStr = daysStr[ day - 1 ];
    }
    return dayStr;
}

export const getDayNumber = (day) => {
    let DayNum = 0;
    if(day != undefined){
        DayNum = daysStr.indexOf(day);
    }
    return DayNum;
}

export const getHourNumber = (hour) => {
    let hourNum = "";
    if(hour != undefined){
        [hourNum] = hour.split(":").map(Number);
    }
    return hourNum;
}
