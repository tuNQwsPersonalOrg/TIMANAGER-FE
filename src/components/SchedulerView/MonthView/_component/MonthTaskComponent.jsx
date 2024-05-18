import React, { useContext } from 'react';
import { GlobalContext } from '../../../../contexts/Global/GlobalContext';
import { shortDays, timeListDetail } from '../../../../constants';
import { GlobalSetCreateTaskForm } from '../../../../contexts/Global/GlobalAction';
import TaskComponent from '../../Task/TaskComponent';
import { convertTime } from '../../../../utils/DateTimeUtil';

const MonthTaskComponent = ({ text, startTime, endTime, taskId }) => {
    const { dispatch } = useContext(GlobalContext);

    const start = convertTime(startTime);
    const end = convertTime(endTime);

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
            style={
                {
                    // top: 1.5 * (startTimeIndex + 1) + 'rem',
                    // height: (endTimeIndex - startTimeIndex) * 1.5 + 'rem',
                }
            }
            text={text}
            suffix={start + ' - ' + end}
            className={`p-1 text-sm w-full`}
            onClick={onClick}
        />
    );
};

export default MonthTaskComponent;
