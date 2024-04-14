import React from 'react';
import './styles.css';
import SchedulerDayViewComponent from '../../components/SchedulerView/DayView/SchedulerDayViewComponent';

const HomePage = () => {
    return (
        <div className="w-full h-full">
            <SchedulerDayViewComponent />
        </div>
    );
};

export default HomePage;
