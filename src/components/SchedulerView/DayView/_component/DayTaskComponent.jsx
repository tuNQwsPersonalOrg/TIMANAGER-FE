import React, { useContext } from 'react';
import TaskComponent from '../../Task/TaskComponent';
import { timeListDetail } from '../../../../constants';
import '../styles.css';
import { GlobalContext } from '../../../../contexts/Global/GlobalContext';
import { GlobalSetCreateTaskForm } from '../../../../contexts/Global/GlobalAction';
import { convertTime } from '../../../../utils/DateTimeUtil';

const DayTaskComponent = ({ text, startTime, endTime, taskId }) => {
    const { dispatch } = useContext(GlobalContext);
    const start = convertTime(startTime);
    const end = convertTime(endTime);
    console.log(start);
    console.log(end);
    const startTimeIndex =
        timeListDetail.findIndex((time) => time === start) + 1;

    const endTimeIndex = timeListDetail.findIndex((time) => time === end) + 1;

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
            style={{
                top: 1.5 * (startTimeIndex + 1) + 'rem',
                height: (endTimeIndex - startTimeIndex) * 1.5 + 'rem',
            }}
            text={text}
            suffix={start + ' - ' + end}
            className={`col-start-1 z-10 absolute w-full overflow-auto`}
            onClick={onClick}
        />
    );
};

export default DayTaskComponent;
