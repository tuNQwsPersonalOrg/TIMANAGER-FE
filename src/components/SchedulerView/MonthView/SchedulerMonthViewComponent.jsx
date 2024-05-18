import React, { useContext, useEffect, useState } from 'react';
import './styles.css';
import { DateCalendar, DayCalendarSkeleton } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { GlobalContext } from '../../../contexts/Global/GlobalContext';
import {
    formatDate,
    getDayName,
    getMonthDays,
} from '../../../utils/DateTimeUtil';
import { shortDays, timeListDisplay } from '../../../constants';
import MonthTaskComponent from './_component/MonthTaskComponent';
import TaskService from '../../../services/task.service';
import { GlobalSetCreateTaskForm } from '../../../contexts/Global/GlobalAction';

const SchedulerMonthViewComponent = ({ show = true }) => {
    const { selectedDate, selectedMonth, createTaskForm, dispatch } =
        useContext(GlobalContext);
    const monthDays = getMonthDays(selectedMonth, dayjs().year());
    const [tasks, setTasks] = useState([]);

    const handleCreateTask = (date) => {
        dispatch(
            GlobalSetCreateTaskForm({
                show: true,
                header: 'Add Task',
                date: date,
                // startTime: time,
            })
        );
    };

    useEffect(() => {
        if (!createTaskForm.show) {
            const getTaskList = async () => {
                const result = await TaskService.getTaskList({
                    start:
                        formatDate(
                            dayjs().year().toString() +
                                '-' +
                                selectedMonth.toString() +
                                '-01'
                        ) + ' 00:00:00',
                    end:
                        formatDate(dayjs().endOf('month').toString()) +
                        ' 23:59:00',
                });
                if (result) {
                    setTasks(result.tasks);
                }
            };
            getTaskList();
        }
    }, [createTaskForm.show, selectedMonth]);

    if (!show) return null;
    return (
        <div className="month-view w-full h-full hidden-container">
            {shortDays.map((day, index) => {
                return (
                    <span key={index} className="text-lg uppercase text-center">
                        {/* {dayName} */}
                        {day}
                    </span>
                );
            })}
            {monthDays.map((date) => {
                const taskInDate = tasks.filter((task) =>
                    dayjs(task.start_time.slice(0, 10)).isSame(dayjs(date))
                );

                return (
                    <div
                        className="flex flex-col px-4 gap-2 items-center justify-start border border-zinc-300 pt-2 hidden-container"
                        onClick={() => {
                            if (!taskInDate.length) {
                                handleCreateTask(date);
                            }
                        }}
                    >
                        <span
                            className="text-lg w-full text-center"
                            onClick={() => {
                                if (taskInDate.length) {
                                    handleCreateTask(date);
                                }
                            }}
                        >
                            {dayjs(date).date()}
                        </span>
                        <div className="scroll-container flex flex-col gap-2 w-full">
                            {taskInDate.map((task) => {
                                return (
                                    <MonthTaskComponent
                                        key={task.id}
                                        text={task.title}
                                        startTime={task.start_time}
                                        endTime={task.end_time}
                                        taskId={task.id}
                                    />
                                );
                            })}
                        </div>
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
