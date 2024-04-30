import React, { useContext } from 'react';
import './styles.css';
import SchedulerDayViewComponent from '../../components/SchedulerView/DayView/SchedulerDayViewComponent';
import SchedulerWeekViewComponent from '../../components/SchedulerView/WeekView/SchedulerWeekViewComponent';
import SchedulerMonthViewComponent from '../../components/SchedulerView/MonthView/SchedulerMonthViewComponent';
import { GlobalContext } from '../../contexts/Global/GlobalContext';

const HomePage = () => {
    const { timespan } = useContext(GlobalContext);
    console.log(timespan);

    return (
        <div className="w-full h-full">
            <SchedulerMonthViewComponent show={timespan === 'month'} />
            <SchedulerDayViewComponent show={timespan === 'day'} />
            <SchedulerWeekViewComponent show={timespan === 'week'} />
        </div>
    );
};

export default HomePage;
