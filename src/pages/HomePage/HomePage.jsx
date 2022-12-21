import classNames from "classnames/bind";
import React from "react";
import { useNavigate } from "react-router-dom";

import Pokemon from "../../components/Pokemon/Pokemon";
import styles from "./HomePage.module.scss";

const cx = classNames.bind(styles);

const HomePage = () => {
    return (
        <div className={cx("wrapper")}>
            <Pokemon />
        </div>
    );
};
export default HomePage;
