import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";

import Button from "../../components/Button/Button";
import FormContext from "../../components/HookForm/FormContext";
import Input from "../../components/Input/Input";
import userServices from "../../services/userServices";

const shema = yup.object().shape({
    username: yup
        .string()
        .required("(*)Vui lòng nhập tên!")
        .matches(
            /^[a-zA-Z!@#\$%\^\&*\)\(+=._-]{3,16}$/,
            "(*)Tên không có kí tự đặc biệt, độ dài 3-16 kí tự!"
        ),
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
    cfPassword: yup
        .string()
        .trim()
        .required("(*)Vui lòng nhập lại mật khẩu!")
        .oneOf([yup.ref("password"), null], "*Mật khẩu đã nhập chưa đúng!"),
    isPrivacy: yup
        .boolean()
        .oneOf(
            [true],
            "(*)Bạn cần đọc và đồng ý với các điều khoản chính sách"
        ),
});

const RegisterPage = () => {
    const methods = useForm({
        resolver: yupResolver(shema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            cfPassword: "",
            isPrivacy: "true",
        },
    });

    const { handleSubmit, setFocus, reset } = methods;

    const navigate = useNavigate();

    const onRegister = async (data) => {
        console.log(data);
        try {
            const { cfPassword, ...res } = data;
            await toast.promise(
                userServices.register(res),
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
                    autoClose: 3000,
                }
            );
            setFocus("username");
            reset();
            navigate("/");
        } catch (error) {
            if (error.response?.status === 409) {
                toast(error.response.data.message, { type: "info" });
            }
        }
    };

    return (
        <div className="form">
            <FormContext methods={methods}>
                <form onSubmit={handleSubmit(onRegister)}>
                    <h3 className="text-center fs-1"> Register</h3>

                    <Input
                        wrapper="mb-1"
                        nameLabel="Username"
                        type="text"
                        className="form-control"
                        nameInput="username"
                        option={{ require: true }}
                    />

                    <Input
                        wrapper="mb-1"
                        nameLabel="Email"
                        type="email"
                        className="form-control"
                        nameInput="email"
                        option={{ require: true }}
                    />
                    <Input
                        wrapper="mb-1"
                        nameLabel="Password"
                        type="password"
                        className="form-control"
                        nameInput="password"
                        option={{ require: true }}
                    />
                    <Input
                        wrapper="mb-1"
                        nameLabel="Confirm password"
                        type="password"
                        className="form-control"
                        nameInput="cfPassword"
                        option={{ require: true }}
                    />
                    <Input
                        wrapper="mb-1 form-check"
                        nameLabel="Tôi đồng ý với Chính Sách Bảo Mật"
                        type="checkbox"
                        className="form-check-input"
                        nameInput="isPrivacy"
                        option={{ require: true }}
                    />
                    <Button
                        wrapper="d-grid gap-2"
                        type="submit"
                        className="btn btn-primary"
                        nameButton="Tạo tài khoản"
                    />
                    <p className="mt-2 text-muted text-center">
                        <Link to="/" className="text-decoration-none">
                            Đăng nhập
                        </Link>
                    </p>
                </form>
            </FormContext>
        </div>
    );
};

export default RegisterPage;
