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

//function get dayNumber and return it as a string
export const getDayOfWeekHebrew = (number) => {
    if (number >= 1 && number <= 7) {
        return daysOfWeekHebrew[number - 1];
    } else {
        return 'Invalid day number';
    }
};
