import React, { useContext, useState } from 'react';
import groupClass from '../../utils/ClassNameUtil';
import { DateCalendar } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import SelectSingleComponent from '../Select/SelectSingleComponent';
import { GlobalContext } from '../../contexts/Global/GlobalContext';
import {
    GlobalActionType,
    GlobalSetSelectedDate,
} from '../../contexts/Global/GlobalAction';

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
                            id: 1,
                            name: 'Day',
                        },
                        {
                            id: 2,
                            name: 'Week',
                        },
                        {
                            id: 3,
                            name: 'Month',
                        },
                        {
                            id: 4,
                            name: 'Year',
                        },
                    ]}
                    renderKey="name"
                    defaultValue="Day"
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
        </div>
    );
};

export default SideBarComponent;
