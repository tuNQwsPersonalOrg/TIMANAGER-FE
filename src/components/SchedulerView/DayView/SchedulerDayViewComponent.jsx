import React, { useContext, useEffect, useState } from 'react';
import './styles.css';
import { timeListDetail, timeListDisplay } from '../../../constants';
import dayjs from 'dayjs';
import { getDayName } from '../../../utils/DateTimeUtil';
import { GlobalContext } from '../../../contexts/Global/GlobalContext';
import { GlobalSetCreateTaskForm } from '../../../contexts/Global/GlobalAction';
import { taskList } from '../../../data/tasks';
import DayTaskComponent from './_component/DayTaskComponent';

const SchedulerDayViewComponent = ({ show = true }) => {
    const { selectedDate, dispatch } = useContext(GlobalContext);
    const tasks = taskList;

    const handleCreateTask = (time) => {
        dispatch(
            GlobalSetCreateTaskForm({
                show: true,
                header: 'Add Task',
                date: dayjs(new Date()).format('DD/MM/YYYY'),
                startTime: time,
            })
        );
    };

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

            <div className="scroll-container flex flex-col relative">
                {timeListDisplay.map((time, index) => {
                    return (
                        <div
                            key={index}
                            className="flex w-full gap-4 items-end"
                        >
                            <div className="w-16 flex justify-end h-12 items-end">
                                {time}
                            </div>
                            <div className="divider" />
                        </div>
                    );
                })}
                <div className="day-task-grid absolute grid w-[95%] h-[75rem] pl-[4.75rem] pt-12">
                    {timeListDetail.map((time, index) => {
                        return (
                            <div
                                key={time}
                                className={`col-start-1 row-span-1 flex items-start justify-center p-2 opacity-0`}
                                onClick={() => {
                                    handleCreateTask(time);
                                }}
                            />
                        );
                    })}

                    {/* <div
                        className={`bg-black w-full h-[${1.5}rem] col-start-1 row-start-5 text-white flex items-start justify-center p-2 z-10 absolute`}
                        onClick={() => {
                            dispatch(
                                GlobalSetCreateTaskForm({
                                    show: true,
                                    header: 'Update Task',
                                })
                            );
                        }}
                    >
                        Test
                    </div> */}
                    <DayTaskComponent
                        key={1}
                        text={'Test'}
                        startTime={'12:00 AM'}
                        endTime={'1:30 AM'}
                    />
                    <DayTaskComponent
                        key={2}
                        text={'Test 2'}
                        startTime={'5:00 AM'}
                        endTime={'5:30 AM'}
                    />
                    <DayTaskComponent
                        key={3}
                        text={'Sleep'}
                        startTime={'12:00 PM'}
                        endTime={'1:30 PM'}
                    />
                </div>
            </div>
        </div>
    );
};

export default SchedulerDayViewComponent;
