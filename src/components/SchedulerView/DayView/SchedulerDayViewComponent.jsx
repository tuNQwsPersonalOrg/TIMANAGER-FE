import React, { useContext, useEffect, useState } from 'react';
import './styles.css';
import { timeListDetail, timeListDisplay } from '../../../constants';
import dayjs from 'dayjs';
import { formatDate, getDayName } from '../../../utils/DateTimeUtil';
import { GlobalContext } from '../../../contexts/Global/GlobalContext';
import { GlobalSetCreateTaskForm } from '../../../contexts/Global/GlobalAction';
import { taskList } from '../../../data/tasks';
import DayTaskComponent from './_component/DayTaskComponent';
import TaskService from '../../../services/task.service';

const SchedulerDayViewComponent = ({ show = true }) => {
    const { selectedDate, createTaskForm, dispatch } =
        useContext(GlobalContext);
    const [tasks, setTasks] = useState([]);

    const handleCreateTask = (time) => {
        dispatch(
            GlobalSetCreateTaskForm({
                show: true,
                header: 'Add Task',
                date: selectedDate,
                startTime: time,
                formType: 'add',
            })
        );
    };

    useEffect(() => {
        if (!createTaskForm.show) {
            const getTaskList = async () => {
                const result = await TaskService.getTaskList({
                    start: formatDate(selectedDate) + ' 00:00:00',
                    end: formatDate(selectedDate) + ' 23:59:00',
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
                    {tasks.map((task) => {
                        return (
                            <DayTaskComponent
                                key={task.id}
                                taskId={task.id}
                                text={task.title}
                                startTime={task.start_time}
                                endTime={task.end_time}
                            />
                        );
                    })}
                    {/* <DayTaskComponent
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
                    /> */}
                </div>
            </div>
        </div>
    );
};

export default SchedulerDayViewComponent;
