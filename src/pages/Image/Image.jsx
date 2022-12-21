import React from "react";
import classNames from "classnames/bind";

import styles from "./Image.module.scss";

const cx = classNames.bind(styles);

const Image = () => {
    return (
        <div className={cx("form")}>
            <input type="file" />
            <button>Upload</button>
        </div>
    );
};

export default Image;
