import React from "react";
import { useSelector } from "react-redux";
import classNames from "classnames/bind";

import styles from "./CartPage.module.scss";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

const CartPage = () => {
    const carts = useSelector((state) => state.cart);
    return (
        <div className={cx("wrapper")}>
            <div className={cx("header")}>
                <h1>Giỏ hàng</h1>
                <Link to="/home" className={cx("comeback")}>
                    Quay lại
                </Link>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Hình ảnh</th>
                        <th scope="col">Tên</th>
                        <th scope="col">Giá</th>
                        <th scope="col">Số lượng</th>
                        <th scope="col">Tùy chọn</th>
                    </tr>
                </thead>
                <tbody>
                    {carts == "" ? (
                        <tr>
                            <td colSpan={6}>
                                Giỏ hàng trống! <Link to="/home">Cửa hàng</Link>
                            </td>
                        </tr>
                    ) : (
                        carts?.map((item) => {
                            return (
                                <tr>
                                    <th scope="row">
                                        <img src={item.img} alt={item.name} />
                                    </th>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>50</td>
                                    <td className={cx("trash")}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={16}
                                            height={16}
                                            fill="currentColor"
                                            className="bi bi-trash-fill"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                        </svg>
                                    </td>
                                </tr>
                            );
                        })
                    )}

                    <tr>
                        <th colSpan={4} className={cx("total")} scope="row">
                            Total:{" "}
                            {carts.reduce(
                                (curr, prev) => curr + +prev.price,
                                0
                            )}
                            $
                        </th>
                        <td className={cx("pay")}>
                            {" "}
                            <button>Thanh toán </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default CartPage;
