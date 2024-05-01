import React, { useContext } from 'react';
import './styles.css';
import { DateCalendar, DayCalendarSkeleton } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { GlobalContext } from '../../../contexts/Global/GlobalContext';
import { getDayName, getMonthDays } from '../../../utils/DateTimeUtil';
import { shortDays, timeListDisplay } from '../../../constants';

const SchedulerMonthViewComponent = ({ show = true }) => {
    const { selectedDate, selectedMonth, dispatch } = useContext(GlobalContext);
    const monthDays = getMonthDays(selectedMonth, dayjs().year());
    // console.log(
    //     getMonthDays(
    //         dayjs('2024-04-26').month() + 1,
    //         dayjs('2024-04-26').year()
    //     )
    // );

    if (!show) return null;
    return (
        <div className="month-view w-full h-full hidden-container">
            {shortDays.map((day) => {
                return (
                    <span className="text-lg uppercase text-center">
                        {/* {dayName} */}
                        {day}
                    </span>
                );
            })}
            {monthDays.map((date) => {
                return (
                    <div className="flex flex-col px-6 items-center justify-start border border-zinc-300 pt-2">
                        <span className="text-lg">{dayjs(date).date()}</span>
                        {/* <span className="bg-red-400 w-full text-center text-white rounded-lg p-1 text-sm">
                            Nghỉ
                        </span> */}
                    </div>
                );
            })}
        </div>
    );
};

export default SchedulerMonthViewComponent;
