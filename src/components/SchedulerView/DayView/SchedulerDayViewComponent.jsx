import React, { useContext, useEffect, useState } from 'react';
import './styles.css';
import { timeListDisplay } from '../../../constants';
import dayjs from 'dayjs';
import { getDayName } from '../../../utils/DateTimeUtil';
import { GlobalContext } from '../../../contexts/Global/GlobalContext';
import { GlobalSetCreateTaskForm } from '../../../contexts/Global/GlobalAction';

const SchedulerDayViewComponent = ({ show = true }) => {
    const { selectedDate, dispatch } = useContext(GlobalContext);

    if (!show) return null;
    return (
        <div className="flex flex-col gap-4 w-full h-full hidden-container">
            <div className="flex flex-col px-6">
                <span className="text-lg uppercase">
                    {/* {dayName} */}
                    {getDayName(dayjs(selectedDate).day())}
                </span>
                <span className="text-header">
                    {dayjs(selectedDate).date()}
                </span>
            </div>

            <div className="scroll-container flex flex-col">
                {timeListDisplay.map((time, index) => {
                    return (
                        <div
                            key={index}
                            className="flex w-full gap-4 items-end"
                            onClick={() => {
                                console.log(
                                    timeListDisplay[index - 1] ?? '12 AM'
                                );
                                if (timeListDisplay[index - 1] !== undefined) {
                                    dispatch(
                                        GlobalSetCreateTaskForm({
                                            show: true,
                                            header: 'Add Task',
                                            startTime:
                                                timeListDisplay[index - 1],
                                        })
                                    );
                                }
                            }}
                        >
                            <div className="w-16 flex justify-end h-12 items-end">
                                {time}
                            </div>
                            <div className="divider" />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SchedulerDayViewComponent;
