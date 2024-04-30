import React, { useEffect, useState } from "react";
import "./styles.css";
import groupClass from "../../utils/ClassNameUtil";
import { formatData, parseNumber } from "../../utils/FormatUtil";

/**
 * @typedef {{
 *  reset: boolean,
 *  className: string | undefined,
 *  inputType: string | undefined,
 *  value: string | number | readonly string[] | undefined,
 *  onChange?: (value: string) => void,
 *  name: string | undefined,
 *  placeholder: string | undefined,
 *  invalid: boolean,
 *  inputRef: any
 * }  & React.InputHTMLAttributes<HTMLInputElement>} TextboxProps
 */

/**
 * @param {TextboxProps} props
 * @returns
 */
const TextboxComponent = ({
    reset = false,
    className,
    type = "text",
    inputType = "text",
    value,
    onChange,
    name,
    placeholder,
    required,
    invalid = false,
    inputRef,
    ...props
}) => {
    // States
    const [inputValue, setInputValue] = useState(value ?? "");
    const [isValid, setIsValid] = useState(true);

    // Handlers
    const handleChangeInput = (e) => {
        if (type === "number" && e.nativeEvent.isComposing) {
            return setIsValid(false);
        }
        setIsValid(true);
        setInputValue(parseNumber(e.target.value, type));
        onChange?.(parseNumber(e.target.value, type));
    };

    const handleBlurInput = (e) => {
        if (!e.target.value && required === true) setIsValid(false);
    };

    useEffect(() => {
        if (reset === true) setInputValue(value);
    }, [reset, value]);

    // Render
    return (
        <input
            className={groupClass(className, "textbox", {
                "error-field": !isValid || invalid,
            })}
            value={formatData(type, inputValue)}
            onChange={handleChangeInput}
            onBlur={handleBlurInput}
            // onFocus={() => setIsValid(true)}
            name={name}
            required={required}
            placeholder={placeholder}
            ref={inputRef}
            type={inputType}
            autoComplete="off"
            {...props}
        />
    );
};

export default TextboxComponent;
