import React, { useContext } from 'react';
import './styles.css';
import { DateCalendar, DayCalendarSkeleton } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { GlobalContext } from '../../../contexts/Global/GlobalContext';
import { getDayName, getMonthDays } from '../../../utils/DateTimeUtil';
import { shortDays, timeListDisplay } from '../../../constants';
import MonthTaskComponent from './_component/MonthTaskComponent';

const SchedulerMonthViewComponent = ({ show = true }) => {
    const { selectedDate, selectedMonth, dispatch } = useContext(GlobalContext);
    const monthDays = getMonthDays(selectedMonth, dayjs().year());
    const tasks = [
        {
            title: 'Off to study',
            date: '2024-05-21',
            target: {
                id: 1,
                name: 'target 1',
            },
        },
        {
            title: 'Off to work',
            date: '2024-05-25',
            target: {
                id: 1,
                name: 'target 1',
            },
        },
    ];
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
                const task = tasks.find((task) =>
                    dayjs(task.date).isSame(dayjs(date))
                );

                return (
                    <div className="flex flex-col px-4 gap-2 items-center justify-start border border-zinc-300 pt-2 hidden-container">
                        <span className="text-lg">{dayjs(date).date()}</span>
                        <div className="scroll-container flex flex-col gap-2 w-full">
                            {task ? (
                                <MonthTaskComponent text={task.title} />
                            ) : null}
                        </div>
                        {/* <span className="bg-red-400 w-full text-center text-white rounded-lg p-1 text-sm">
                            Nghỉ
                        </span> */}
                    </div>
                );
            })}
            {/* <MonthTaskComponent /> */}
        </div>
    );
};

export default SchedulerMonthViewComponent;
