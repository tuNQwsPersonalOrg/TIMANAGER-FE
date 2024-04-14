import React, { useContext, useEffect, useState } from 'react';
import './styles.css';
import { timeListDisplay } from '../../../constants';
import dayjs from 'dayjs';
import { getDayName } from '../../../utils/DateTimeUtil';
import { GlobalContext } from '../../../contexts/Global/GlobalContext';

const SchedulerDayViewComponent = () => {
    const { selectedDate } = useContext(GlobalContext);

    return (
        <div className=" flex flex-col gap-8 w-full h-full hidden-container">
            <div className="flex flex-col px-6">
                <span className="text-lg uppercase">
                    {/* {dayName} */}
                    {getDayName(dayjs(selectedDate).day())}
                </span>
                <span className="text-header">
                    {dayjs(selectedDate).date()}
                </span>
            </div>

            <div className="scroll-container flex flex-col gap-12">
                {timeListDisplay.map((time) => {
                    return (
                        <div className="flex w-full gap-4 items-end">
                            <div className="w-16 flex justify-end">{time}</div>
                            <div className="divider" />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SchedulerDayViewComponent;
