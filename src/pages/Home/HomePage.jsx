import React from 'react';
import './styles.css';
import SchedulerDayViewComponent from '../../components/SchedulerView/DayView/SchedulerDayViewComponent';
import SchedulerMonthViewComponent from '../SchedulerView/MonthView/SchedulerMonthViewComponent';
import SchedulerWeekViewComponent from '../../components/SchedulerView/WeekView/SchedulerWeekViewComponent';

const HomePage = () => {
    return (
        <div className="w-full h-full">
            <SchedulerDayViewComponent />
            {/* <SchedulerWeekViewComponent /> */}
        </div>
    );
};

export default HomePage;
