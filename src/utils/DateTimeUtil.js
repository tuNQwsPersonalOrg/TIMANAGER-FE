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

export function getMonthDays(month, year) {
    const monthDays = [];
    let firstDayInMonth = dayjs(`${year}-${month}-01`);
    let day = firstDayInMonth.subtract(firstDayInMonth.day(), 'day');

    while (day.month() <= month - 1 || day.day() !== 0) {
        monthDays.push(day.format('YYYY-MM-DD'));
        day = day.add(1, 'day');
    }

    return monthDays;
}

export function formatDate(date) {
    return dayjs(date).format('YYYY-MM-DD');
}

export function formatTimestamp(timestamp) {
    return dayjs(timestamp).format('YYYY-MM-DD hh:mm:ss');
}

export function formatTime(time) {
    if (!time) return null;

    const formattedTime = time.slice(0, -3);
    if (time.slice(0, 2) === '12') {
        if (time.slice(-2) === 'AM') return '00:' + formattedTime.split(':')[1];
        else return '12:' + formattedTime.split(':')[1];
    }
    if (time.slice(-2) === 'PM') {
        const hours = (Number(formattedTime.split(':')[0]) + 12) % 24;
        return hours + ':' + formattedTime.split(':')[1];
    }
    return formattedTime;
}

export function convertTime(timestamp) {
    if (!timestamp) return null;

    const time = timestamp.slice(-8);
    const hours = time.split(':')[0];
    const minutes = time.split(':')[1];
    // const seconds = time.split(':')[2];

    const i_hours = Number(hours);
    if (i_hours === 0) return '12:' + minutes + ' AM';
    if (i_hours < 12) {
        return i_hours.toString() + ':' + minutes + ' AM';
    } else {
        return (i_hours - 12).toString() + ':' + minutes + ' PM';
    }
}
