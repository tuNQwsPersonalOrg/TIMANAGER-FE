import dayjs from 'dayjs';

export function getDayName(dayNumber) {
    switch (dayNumber) {
        case 0:
            return 'Sunday';
        case 1:
            return 'Monday';
        case 2:
            return 'Tuesday';
        case 3:
            return 'Wednesday';
        case 4:
            return 'Thursday';
        case 5:
            return 'Friday';
        case 6:
            return 'Saturday';
        default:
            return 'Sunday';
    }
}

export function getWeekDays(date) {
    const weekDays = [];
    let day = dayjs(date).startOf('week');

    for (let i = 0; i < 7; i++) {
        weekDays.push(day.add(i, 'day').format('YYYY-MM-DD'));
    }

    return weekDays;
}
