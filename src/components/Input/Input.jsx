import React from "react";
import { useFormContext } from "react-hook-form";
import className from "classnames/bind";

import accessNestedObject from "../../until/accessNestedObject";

import styles from "./Input.module.scss";

const cx = className.bind(styles);

const Input = (props) => {
    const {
        nameLabel,
        type,
        nameInput,
        className,
        onChange,
        wrapper,
        option,
        ...res
    } = props;

    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <div className={wrapper}>
            <label htmlFor={nameInput} className="form-label">
                {nameLabel}
            </label>
            <input
                type={type}
                className={className}
                {...register(nameInput, option)}
                {...res}
            />
            <p className={cx("message")}>
                {accessNestedObject(errors, nameInput)?.message}
            </p>
        </div>
    );
};

export default Input;
