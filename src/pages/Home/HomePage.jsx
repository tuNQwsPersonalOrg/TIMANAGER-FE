import React from 'react';
import './styles.css';
import SchedulerDayViewComponent from '../../components/SchedulerView/DayView/SchedulerDayViewComponent';
import SchedulerWeekViewComponent from '../../components/SchedulerView/WeekView/SchedulerWeekViewComponent';
import SchedulerMonthViewComponent from '../../components/SchedulerView/MonthView/SchedulerMonthViewComponent';

const HomePage = () => {
    return (
        <div className="w-full h-full">
            {/* <SchedulerMonthViewComponent /> */}
            {/* <SchedulerDayViewComponent /> */}
            <SchedulerWeekViewComponent />
        </div>
    );
};

export default HomePage;
