import React, { useContext } from 'react';
import { GlobalContext } from '../../../../contexts/Global/GlobalContext';
import { shortDays, timeListDetail } from '../../../../constants';
import { GlobalSetCreateTaskForm } from '../../../../contexts/Global/GlobalAction';
import TaskComponent from '../../Task/TaskComponent';

const MonthTaskComponent = ({ text, key, day }) => {
    const { dispatch } = useContext(GlobalContext);

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
            style={
                {
                    // top: 1.5 * (startTimeIndex + 1) + 'rem',
                    // height: (endTimeIndex - startTimeIndex) * 1.5 + 'rem',
                }
            }
            text={text}
            className={`p-1 text-sm text-center`}
            onClick={onClick}
        />
    );
};

export default MonthTaskComponent;
