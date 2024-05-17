import React, { useContext } from 'react';
import { GlobalContext } from '../../../../contexts/Global/GlobalContext';
import { shortDays, timeListDetail } from '../../../../constants';
import { GlobalSetCreateTaskForm } from '../../../../contexts/Global/GlobalAction';
import TaskComponent from '../../Task/TaskComponent';
import { convertTime, getDayName } from '../../../../utils/DateTimeUtil';
import dayjs from 'dayjs';

const WeekTaskComponent = ({ text, startTime, endTime, taskId }) => {
    const { dispatch } = useContext(GlobalContext);
    const start = convertTime(startTime);
    const end = convertTime(endTime);
    const day = getDayName(dayjs(startTime.slice(0, 10)).day())
        .toUpperCase()
        .slice(0, 3);
    console.log(day);
    const startTimeIndex =
        timeListDetail.findIndex((time) => time === start) + 1;

    const endTimeIndex = timeListDetail.findIndex((time) => time === end) + 1;

    const dayIndex = shortDays.findIndex((shortDay) => shortDay === day) + 1;

    const onClick = () => {
        dispatch(
            GlobalSetCreateTaskForm({
                taskId: taskId,
                show: true,
                header: 'Update Task',
                formType: 'update',
            })
        );
    };

    return (
        <TaskComponent
            // key={key}
            style={{
                top: 1.5 * (startTimeIndex - 1) + 'rem',
                height: (endTimeIndex - startTimeIndex) * 1.5 + 'rem',
                left: 9.55 * (dayIndex - 1) + 'rem',
            }}
            text={text}
            suffix={start + ' - ' + end}
            className={`w-[9.5rem] z-20 absolute overflow-auto`}
            onClick={onClick}
        />
    );
};

export default WeekTaskComponent;
