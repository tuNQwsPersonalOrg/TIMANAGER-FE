import React, { useId, useRef, useState } from "react";
import "./styles.css";
import useSelect from "../../hooks/useSelect";
import groupClass from "../../utils/ClassNameUtil";
import { IconClose, IconExpandMore } from "../../icons";

const SelectMultipleComponent = ({
    className,
    options = [],
    iconOnly = false,
    icon,
    prefix,
    suffix,
    disabled = false,
    onSelect,
    placeholder = "Choose",
    renderKey = "label",
    valueKey = "value",
    boxHeader,
    defaultSelect = [],
    name = "",
    ...props
}) => {
    const inputId = useId();
    const selectRef = useRef();
    const [selectedKeys, setSelectedKeys] = useState(defaultSelect);
    const { selectBox, expand, setExpand, toggleSelect } = useSelect(
        selectRef.current,
    );

    const handleToggleSelect = () => {
        if (disabled) return;
        if (expand === true) return setExpand(false);

        toggleSelect();
        setExpand(true);
    };

    const handleSelect = (event, option) => {
        if (disabled) return;
        if (!event.target.checked) {
            const newList = selectedKeys.filter(
                (key) => key !== option[valueKey],
            );
            setSelectedKeys(newList);
            onSelect?.(option, newList);
        } else {
            const newList = selectedKeys.concat(option[valueKey]);
            setSelectedKeys(newList);
            onSelect?.(option, newList);
        }
    };
    const handleDeleteItem = (event, option) => {
        event.stopPropagation();
        setSelectedKeys((prevList) =>
            prevList.filter((key) => key !== option[valueKey]),
        );
    };
    return (
        <div
            ref={selectRef}
            className={groupClass(
                "select-multiple overflow-hidden",
                className,
                { disabled: disabled },
            )}
            {...props}
        >
            {iconOnly ? (
                <div
                    className="flex items-center justify-center"
                    onClick={handleToggleSelect}
                >
                    {icon}
                </div>
            ) : (
                <div
                    className="select-multiple-toggle"
                    onClick={handleToggleSelect}
                >
                    {prefix ? (
                        <div className="select-multiple-prefix">{prefix}</div>
                    ) : null}
                    <div
                        className={groupClass("select-multiple-selected-list", {
                            "leading-normal": disabled,
                        })}
                    >
                        {selectedKeys.length === 0
                            ? placeholder
                            : selectedKeys
                                  .map((selected) =>
                                      options.find(
                                          (option) =>
                                              option[valueKey] === selected,
                                      ),
                                  )
                                  .map((option) => (
                                      <div
                                          className="select-multiple-selected-item"
                                          key={option[valueKey]}
                                      >
                                          <span className="select-multiple-selected-item-name">
                                              {option[renderKey]}
                                          </span>
                                          <div
                                              className="select-multiple-selected-item-delete"
                                              onClick={(event) =>
                                                  handleDeleteItem(
                                                      event,
                                                      option,
                                                  )
                                              }
                                          >
                                              <IconClose
                                                  fill="white"
                                                  width="0.75rem"
                                                  height="0.75rem"
                                              />
                                          </div>
                                      </div>
                                  ))}
                    </div>
                    <div className="select-multiple-suffix">
                        {disabled ? null : suffix ? (
                            suffix
                        ) : (
                            <IconExpandMore
                                fill="rgba(255, 255, 255, 0.60)"
                                className={groupClass(
                                    "transition-[transform] duration-200 ease-linear",
                                    "select-multiple-suffix-icon h-5 w-5",
                                    {
                                        "-rotate-180": expand,
                                    },
                                )}
                            />
                        )}
                    </div>
                </div>
            )}
            <div
                className={groupClass(
                    "select-multiple-list-container",
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
                {boxHeader ? (
                    <h3 className="select-multiple-box-header">{boxHeader}</h3>
                ) : null}
                <ul className="select-multiple-list">
                    {options.length > 0 ? (
                        options.map((option) => (
                            <li
                                key={`${option[valueKey]}-${option[renderKey]}`}
                                className="select-multiple-item rounded hover:bg-[#767680]/50"
                            >
                                <label
                                    htmlFor={`${inputId}-${option[valueKey]}`}
                                    className="select-multiple-item-label"
                                >
                                    <input
                                        type="checkbox"
                                        name={name}
                                        id={`${inputId}-${option[valueKey]}`}
                                        checked={selectedKeys.includes(
                                            option[valueKey],
                                        )}
                                        value={option[valueKey]}
                                        onChange={(event) =>
                                            handleSelect(event, option)
                                        }
                                    />
                                    {option[renderKey]}
                                </label>
                            </li>
                        ))
                    ) : (
                        <div className="flex items-center justify-center p-1">
                            <p className="text-white/50">No available option</p>
                        </div>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default SelectMultipleComponent;
