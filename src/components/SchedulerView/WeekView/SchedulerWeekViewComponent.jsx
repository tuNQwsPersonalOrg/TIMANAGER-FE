import React, { useContext } from 'react';
import { GlobalContext } from '../../../contexts/Global/GlobalContext';
import dayjs from 'dayjs';
import { timeListDisplay } from '../../../constants';
import { getDayName, getWeekDays } from '../../../utils/DateTimeUtil';
import './styles.css';

const SchedulerWeekViewComponent = () => {
    const { selectedDate } = useContext(GlobalContext);
    const weekDays = getWeekDays(selectedDate);
    console.log(weekDays);

    return (
        <div className="flex flex-col gap-8 w-full h-full hidden-container">
            <div className="day-display-container">
                <div />
                {weekDays.map((day) => {
                    return (
                        <div className="flex flex-col px-6 items-center">
                            <span className="text-lg uppercase">
                                {/* {dayName} */}
                                {getDayName(dayjs(day).day())}
                            </span>
                            <span className="text-header">
                                {dayjs(day).date()}
                            </span>
                        </div>
                    );
                })}
            </div>

            <div className="scroll-container scheduler-week-view">
                <div className="flex flex-col justify-between">
                    {timeListDisplay.map((time) => {
                        return (
                            <div className="flex w-full gap-4 items-end">
                                <div className="w-16 flex justify-end">
                                    {time}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="scheduler">
                    {timeListDisplay.map((time) => {
                        return weekDays.map((day) => {
                            return (
                                <div
                                    className="border-t border-r border-black"
                                    onClick={() =>
                                        console.log(
                                            time,
                                            dayjs(day).format('DD-MM-YYYY')
                                        )
                                    }
                                ></div>
                            );
                        });
                    })}
                </div>
            </div>
        </div>
    );
};

export default SchedulerWeekViewComponent;
