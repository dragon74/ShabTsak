export const hourArr = Array.from({ length: 25 }, (_, index) => {
    const hour = (index).toString();
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

//function get dayNumber and return it as a string
export const getDayOfWeekHebrew = (number) => {
    if (number >= 1 && number <= 7) {
        return daysOfWeekHebrew[number - 1];
    } else {
        return 'Invalid day number';
    }
};
