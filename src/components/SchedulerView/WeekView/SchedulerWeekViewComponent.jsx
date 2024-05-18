import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../../contexts/Global/GlobalContext';
import dayjs from 'dayjs';
import { timeListDetail, timeListDisplay } from '../../../constants';
import {
    formatDate,
    getDayName,
    getWeekDays,
} from '../../../utils/DateTimeUtil';
import './styles.css';
import { GlobalSetCreateTaskForm } from '../../../contexts/Global/GlobalAction';
import WeekTaskComponent from './_component/WeekTaskComponent';
import TaskService from '../../../services/task.service';

const SchedulerWeekViewComponent = ({ show = true }) => {
    const { selectedDate, dispatch, createTaskForm } =
        useContext(GlobalContext);
    const weekDays = getWeekDays(selectedDate);
    const [tasks, setTasks] = useState([]);

    const handleCreateTask = (time, date) => {
        dispatch(
            GlobalSetCreateTaskForm({
                show: true,
                header: 'Add Task',
                date: date,
                startTime: time,
            })
        );
    };

    useEffect(() => {
        if (!createTaskForm.show) {
            const getTaskList = async () => {
                const result = await TaskService.getTaskList({
                    start: formatDate(weekDays[0]) + ' 00:00:00',
                    end:
                        formatDate(weekDays[weekDays.length - 1]) + ' 23:59:00',
                });
                if (result) {
                    setTasks(result.tasks);
                }
            };
            getTaskList();
        }
    }, [createTaskForm.show, selectedDate]);

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
                        {timeListDisplay.map((time, index) => {
                            if (index === timeListDisplay.length - 1)
                                return null;
                            return weekDays.map((day) => {
                                return (
                                    <div
                                        key={time + day}
                                        className={`flex items-start justify-center p-2 border border-zinc-300`}
                                    />
                                );
                            });
                        })}
                    </div>
                    <div className="week-task-grid z-10 absolute w-full">
                        {timeListDetail.map((time) => {
                            return weekDays.map((day) => {
                                return (
                                    <div
                                        key={time + day}
                                        className={`flex items-start justify-center p-2 opacity-0`}
                                        onClick={() => {
                                            handleCreateTask(time, day);
                                        }}
                                    />
                                );
                            });
                        })}

                        {tasks.map((task) => {
                            return (
                                <WeekTaskComponent
                                    key={task.id}
                                    text={task.title}
                                    startTime={task.start_time}
                                    endTime={task.end_time}
                                    taskId={task.id}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SchedulerWeekViewComponent;
