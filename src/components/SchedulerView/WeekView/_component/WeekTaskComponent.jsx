import React, { useContext } from 'react';
import { GlobalContext } from '../../../../contexts/Global/GlobalContext';
import { shortDays, timeListDetail } from '../../../../constants';
import { GlobalSetCreateTaskForm } from '../../../../contexts/Global/GlobalAction';
import TaskComponent from '../../Task/TaskComponent';

const WeekTaskComponent = ({ text, startTime, endTime, key, day }) => {
    const { dispatch } = useContext(GlobalContext);
    const startTimeIndex =
        timeListDetail.findIndex((time) => time === startTime) + 1;

    const endTimeIndex =
        timeListDetail.findIndex((time) => time === endTime) + 1;

    const dayIndex = shortDays.findIndex((shortDay) => shortDay === day) + 1;

    const onClick = () => {
        dispatch(
            GlobalSetCreateTaskForm({
                show: true,
                header: 'Update Task',
            })
        );
    };

    return (
        <TaskComponent
            key={key}
            style={{
                top: 1.5 * (startTimeIndex - 1) + 'rem',
                height: (endTimeIndex - startTimeIndex) * 1.5 + 'rem',
                left: 11 * (dayIndex - 1) + 'rem',
            }}
            text={text}
            suffix={startTime + ' - ' + endTime}
            className={`w-44 z-20 absolute`}
            onClick={onClick}
        />
    );
};

export default WeekTaskComponent;
