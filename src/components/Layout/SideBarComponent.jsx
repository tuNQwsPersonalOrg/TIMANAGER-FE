import React, { useContext, useState } from 'react';
import groupClass from '../../utils/ClassNameUtil';
import { DateCalendar } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import SelectSingleComponent from '../Select/SelectSingleComponent';
import { GlobalContext } from '../../contexts/Global/GlobalContext';
import {
    GlobalActionType,
    GlobalSetSelectedDate,
    GlobalSetTimespan,
} from '../../contexts/Global/GlobalAction';
import { NavLink } from 'react-router-dom';

const SideBarComponent = () => {
    // const [selectedDay, setSelectedDay] = useState(new Date());
    const { selectedDate, dispatch } = useContext(GlobalContext);

    return (
        <div
            className={groupClass(
                'relative flex flex-col gap-2.5 p-2.5',
                'overflow-auto bg-gray-300 shadow-2x2'
            )}
        >
            <div className="px-12">
                <SelectSingleComponent
                    options={[
                        {
                            id: 'day',
                            name: 'Day',
                        },
                        {
                            id: 'week',
                            name: 'Week',
                        },
                        {
                            id: 'month',
                            name: 'Month',
                        },
                    ]}
                    renderKey="name"
                    defaultValue="Day"
                    onSelect={(item) => {
                        dispatch(GlobalSetTimespan(item.id));
                        // console.log(item);
                    }}
                />
            </div>

            <DateCalendar
                showDaysOutsideCurrentMonth
                value={dayjs(selectedDate)}
                onChange={(newSelectedDate) =>
                    dispatch(GlobalSetSelectedDate(newSelectedDate))
                }
                // view={['month', 'year']}
            />

            <div className="flex w-full justify-center gap-5">
                <NavLink to={'/home'}>Task</NavLink>
                <NavLink to={'/target'}>Target</NavLink>
            </div>
        </div>
    );
};

export default SideBarComponent;
