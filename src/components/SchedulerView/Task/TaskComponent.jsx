import React from 'react';

const TaskComponent = ({
    key,
    style,
    text,
    className = '',
    suffix,
    onClick,
}) => {
    console.log(style);
    return (
        <div
            key={key}
            style={style}
            className={`${className} bg-[#039BE5] w-full p-2 text-white rounded-md overflow-auto`}
            onClick={onClick}
        >
            {text}
            <span className="text-sm ml-8">{suffix}</span>
        </div>
    );
};

export default TaskComponent;
