import React, { useContext } from 'react';
import TaskComponent from '../../Task/TaskComponent';
import { timeListDetail } from '../../../../constants';
import '../styles.css';
import { GlobalContext } from '../../../../contexts/Global/GlobalContext';
import { GlobalSetCreateTaskForm } from '../../../../contexts/Global/GlobalAction';

const DayTaskComponent = ({ text, startTime, endTime, key }) => {
    const { dispatch } = useContext(GlobalContext);
    const startTimeIndex =
        timeListDetail.findIndex((time) => time === startTime) + 1;

    const endTimeIndex =
        timeListDetail.findIndex((time) => time === endTime) + 1;

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
                top: 1.5 * (startTimeIndex + 1) + 'rem',
                height: (endTimeIndex - startTimeIndex) * 1.5 + 'rem',
            }}
            text={text}
            suffix={startTime + ' - ' + endTime}
            className={`col-start-1 z-10 absolute`}
            onClick={onClick}
        />
    );
};

export default DayTaskComponent;
