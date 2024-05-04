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
        <div
            key={key}
            style={style}
            className={`${className} bg-[#039BE5] p-2 text-white rounded-md`}
            onClick={onClick}
        >
            {text}
            <span className="text-xs ml-8">{suffix}</span>
        </div>
    );
};

export default TaskComponent;
