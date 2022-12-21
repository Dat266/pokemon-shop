import React from "react";

const Button = (props) => {
    const { type, className, nameButton, wrapper, ...res } = props;

    return (
        <div className={wrapper}>
            <button type={type} className={className} {...res}>
                {nameButton}
            </button>
        </div>
    );
};

export default Button;
