import React from 'react';

const TaskComponent = ({
    key,
    style,
    text,
    className = '',
    suffix,
    textBelow = '',
    onClick,
}) => {
    return (
        <div className="flex flex-col">
            <div
                key={key}
                style={style}
                className={`${className} bg-[#039BE5] p-2 text-white rounded-md flex flex-col`}
                onClick={onClick}
            >
                <div>
                    {text}
                    <span className="text-xs ml-8">{suffix}</span>
                </div>
                <div className="text-xs">{textBelow}</div>
            </div>
        </div>
    );
};

export default TaskComponent;
