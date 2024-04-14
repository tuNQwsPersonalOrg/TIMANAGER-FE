import React from 'react';
import groupClass from '../../utils/ClassNameUtil';
import { DateCalendar } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

const SideBarComponent = () => {
    return (
        <div
            className={groupClass(
                'relative flex flex-col gap-2.5 p-2.5',
                'overflow-auto bg-gray-300 shadow-2x2'
            )}
        >
            <DateCalendar
                showDaysOutsideCurrentMonth
                defaultValue={dayjs(new Date())}
                // view={['month', 'year']}
            />
        </div>
    );
};

export default SideBarComponent;
