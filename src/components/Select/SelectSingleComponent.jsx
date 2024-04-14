import React, { useRef, useState } from "react";
import "./styles.css";
import useSelect from "../../hooks/useSelect";
import groupClass from "../../utils/ClassNameUtil";
import { IconExpandMore } from "../../icons";

const SelectSingleComponent = ({
    className,
    options = [],
    prefix,
    suffix,
    disabled = false,
    onSelect,
    defaultValue = "",
    placeholder = "Choose",
    renderKey = "label",
    valueKey = "value",
    name,
    nullable = false,
    required,
    error,
    ...props
}) => {
    const selectRef = useRef();
    const [selected, setSelected] = useState({
        [renderKey]: defaultValue,
        [valueKey]: "",
    });
    const { expand, setExpand, selectBox, toggleSelect } = useSelect(
        selectRef.current,
    );

    const handleToggleSelect = () => {
        if (disabled) return;
        if (expand === true) return setExpand(false);

        toggleSelect();
        setExpand(true);
    };

    const handleSelect = (option) => {
        if (disabled) return;
        if (option[renderKey] === selected[renderKey]) return;
        onSelect?.(option);
        setSelected(option);
        setExpand(false);
    };
    return (
        <div
            ref={selectRef}
            className={groupClass("select-single", className, {
                disabled: disabled,
            })}
            {...props}
        >
            <div
                className={groupClass("select-single-toggle", {
                    "error-field": !!error && selected[valueKey] === "",
                })}
                onClick={handleToggleSelect}
            >
                {prefix ? (
                    <div className="select-single-prefix">{prefix}</div>
                ) : null}
                <span
                    className={groupClass("select-single-label flex-1", {
                        "leading-loose": disabled,
                    })}
                >
                    {selected[renderKey] === ""
                        ? placeholder
                        : selected[renderKey]}
                </span>
                <div className="select-single-suffix">
                    {disabled ? null : suffix ? (
                        suffix
                    ) : (
                        <IconExpandMore
                            fill="rgba(255, 255, 255, 0.60)"
                            className={groupClass(
                                "select-single-suffix-icon h-5 w-5",
                                {
                                    "-rotate-180": expand,
                                },
                            )}
                        />
                    )}
                </div>
            </div>
            <p
                className={groupClass("mt-1 w-full italic text-red-500", {
                    hidden: !error || selected[valueKey] !== "",
                })}
            >
                {error}
            </p>
            <ul
                className={groupClass(
                    "select-single-list",
                    "transition-[transform,opacity,visibility] duration-150 ease-linear",
                    {
                        "scale-y-0 opacity-0 ": !expand,
                        "visible scale-y-100 opacity-100": expand,
                        "origin-top translate-y-0.5": selectBox.bottom === null,
                        "origin-bottom -translate-y-0.5":
                            selectBox.top === null,
                    },
                )}
                style={{
                    top: selectBox.top,
                    left: selectBox.left,
                    bottom: selectBox.bottom,
                    right: selectBox.right,
                    width: selectBox.width,
                }}
            >
                {options.length > 0 ? (
                    [{ [renderKey]: "None", [valueKey]: null }]
                        .concat(options)
                        .filter((option) =>
                            !nullable ? option[valueKey] !== null : true,
                        )
                        .map((option) => (
                            <li
                                key={`${option[valueKey]}-${option[renderKey]}`}
                                className={groupClass(
                                    "rounded px-[0.5em] py-[0.5em] hover:bg-[#767680]/50",
                                    {
                                        "bg-highlight text-white":
                                            selected[renderKey] ===
                                            option[renderKey],
                                    },
                                )}
                                onClick={() => handleSelect(option)}
                            >
                                {option[renderKey]}
                            </li>
                        ))
                ) : (
                    <div className="flex items-center justify-center p-1">
                        <p className="text-white/50">No available option</p>
                    </div>
                )}
            </ul>
            <input
                type="hidden"
                name={name}
                value={(() => {
                    const defaultSelect = options.find(
                        (option) => option[renderKey] === selected[renderKey],
                    );
                    return defaultSelect
                        ? defaultSelect[valueKey]
                        : selected[valueKey] ?? "";
                })()}
                required={required}
            />
        </div>
    );
};

export default SelectSingleComponent;
