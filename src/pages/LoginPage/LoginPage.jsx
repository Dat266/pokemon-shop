import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { toast } from "react-toastify";

import Button from "../../components/Button/Button";
import FormContext from "../../components/HookForm/FormContext";
import Input from "../../components/Input/Input";
import userServices from "../../services/userServices";

const schema = yup.object().shape({
    email: yup
        .string()
        .required("(*)Vui lòng nhập địa chỉ email của bạn!")
        .matches(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "(*)Vui lòng nhập đúng địa chỉ email!"
        ),
    password: yup
        .string()
        .trim()
        .required("(*)Vui lòng nhập mật khẩu!")
        .matches(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
            "(*)Tối thiểu 8 ký tự, trong đó có 1 ký tự viết hoa, 1 ký tự thường, 1 chữ số và 1 ký tự đặc biệt"
        ),
});

const LoginPage = () => {
    const methods = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const { handleSubmit, setFocus, reset } = methods;
    const navigate = useNavigate();

    const onLogin = async (data) => {
        try {
            const res = await toast.promise(
                userServices.login(data),
                {
                    pending: {
                        render() {
                            return "Đang kết nối";
                        },
                        icon: "😇",
                    },
                    success: {
                        render({ data }) {
                            return data.data.message;
                        },
                        icon: "😍",
                    },
                    error: {
                        render({ data }) {
                            return data?.response?.data.message;
                        },
                        icon: "😵",
                    },
                },
                {
                    autoClose: 1000,
                }
            );
            const user = res.data?.data;
            localStorage.setItem("user", JSON.stringify(user));
            setFocus("email");
            reset();
            navigate("/home");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="form">
            <FormContext methods={methods}>
                <form onSubmit={handleSubmit(onLogin)}>
                    <h3 className="text-center fs-1">Login</h3>
                    <Input
                        wrapper="mb-3"
                        nameLabel="Email"
                        type="email"
                        className="form-control"
                        nameInput="email"
                    />
                    <Input
                        wrapper="mb-3"
                        nameLabel="Password"
                        type="password"
                        className="form-control"
                        nameInput="password"
                        option={{ require: true }}
                    />
                    <Input
                        wrapper="mb-3 form-check"
                        nameLabel="Lưu tài khoản"
                        type="checkbox"
                        className="form-check-input"
                        nameInput="isSave"
                    />
                    <Button
                        wrapper="d-grid gap-2"
                        type="submit"
                        className="btn btn-primary"
                        nameButton="Đăng nhập"
                    />
                    <p className="mt-2 text-muted d-flex justify-content-between ">
                        <Link to="#" className="text-decoration-none">
                            Quên mật khẩu?{" "}
                        </Link>
                        <Link to="/register" className=" text-decoration-none">
                            Tạo tài khoản
                        </Link>
                    </p>
                </form>
            </FormContext>
        </div>
    );
};

export default LoginPage;
