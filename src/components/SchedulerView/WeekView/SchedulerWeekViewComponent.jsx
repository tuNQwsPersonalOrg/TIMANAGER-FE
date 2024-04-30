import React, { useContext } from 'react';
import { GlobalContext } from '../../../contexts/Global/GlobalContext';
import dayjs from 'dayjs';
import { timeListDisplay } from '../../../constants';
import { getDayName, getWeekDays } from '../../../utils/DateTimeUtil';
import './styles.css';

const SchedulerWeekViewComponent = ({ show = true }) => {
    const { selectedDate } = useContext(GlobalContext);
    const weekDays = getWeekDays(selectedDate);
    console.log(weekDays);

    if (!show) return null;
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
                <div className="flex flex-col h-full justify-between relative">
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
                <div className="relative h-[72rem]">
                    <div className="scheduler absolute w-full">
                        {timeListDisplay.map((time) => {
                            return weekDays.map((day) => {
                                return (
                                    <div
                                        className="border border-zinc-300"
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
                    <div className="scheduler-overlay absolute w-full">
                        <div className="bg-black col-start-1 row-start-10 row-span-3 text-white flex items-start justify-center p-2">
                            Test
                        </div>
                        <div className="bg-black col-start-2 row-start-12 row-span-4 text-white flex items-start justify-center p-2">
                            Test 2
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SchedulerWeekViewComponent;
