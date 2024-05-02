import React from 'react';

const TaskComponent = ({
    key,
    style,
    text,
    className = '',
    suffix,
    onClick,
}) => {
    return (
        <span
            key={key}
            style={style}
            className={`bg-[#039BE5] w-full p-2 text-white rounded-md overflow-auto ${className}`}
            onClick={onClick}
        >
            {text}
            <span className="text-sm ml-8">{suffix}</span>
        </span>
    );
};

export default TaskComponent;
