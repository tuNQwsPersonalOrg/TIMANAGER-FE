import React from 'react';

const DeadlineComponent = ({ title, deadline }) => {
    return (
        <div className="flex flex-col absolute w-full">
            <span className="text-xs text-red-500">{title}</span>
            <div className="w-full h-[1px] bg-red-600"></div>
            <span className="text-xs text-red-500">{deadline}</span>
        </div>
    );
};

export default DeadlineComponent;
