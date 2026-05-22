"use client"
import React, { forwardRef, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Input = forwardRef(
    (
        {
            id,
            name,
            label,
            type = "text",
            value,
            defaultValue,
            onChange,
            placeholder,
            className = "",
            inputClassName = "",
            labelClassName = "",
            disabled = false,
            required = false,
            error,
            icon, // React node shown inside the input (left)
            rightIcon, // React node shown inside the input (right)
            ...rest
        },
        ref
    ) => {
        const inputId = id || name;
        const [showPassword, setShowPassword] = useState(false);
        const isPassword = type === "password";
        const inputType = isPassword ? (showPassword ? "text" : "password") : type;

        const togglePasswordVisibility = (e) => {
            e.preventDefault();
            e.stopPropagation();
            setShowPassword(!showPassword);
        };

        const passwordToggleIcon = isPassword ? (
            <button
                type="button"
                onClick={togglePasswordVisibility}
                className="focus:outline-none hover:text-accent text-gray-400 p-1 flex items-center justify-center cursor-pointer transition-colors duration-150"
                aria-label={showPassword ? "Hide password" : "Show password"}
            >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
        ) : null;

        return (
            <div className={`input-field relative ${className}`}>
                {label && (
                    <label htmlFor={inputId} className={`input-label ${labelClassName}`}>
                        {label}
                        {required ? " *" : null}
                    </label>
                )}

                <div
                    className={`flex justify-center items-center input-wrapper ${error ? "input-error" : ""} ${disabled ? "input-disabled" : ""
                        }`}
                >
                    {icon && <span className="input-icon left ">{icon}</span>}

                    <input
                        id={inputId}
                        name={name}
                        ref={ref}
                        type={inputType}
                        value={value}
                        defaultValue={defaultValue}
                        onChange={onChange}
                        placeholder={placeholder}
                        disabled={disabled}
                        aria-invalid={!!error}
                        aria-describedby={error ? `${inputId}-error` : undefined}
                        className={`input-element ${inputClassName} ${isPassword ? "pr-10" : ""}`}
                        required={required}
                        {...rest}
                    />

                    {isPassword ? (
                        <div className="absolute right-3 flex items-center justify-center z-10">
                            {passwordToggleIcon}
                        </div>
                    ) : (
                        rightIcon && <span className="input-icon right">{rightIcon}</span>
                    )}
                </div>

                {error && (
                    <p id={`${inputId}-error`} className="input-error-text" role="alert">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

export default Input;