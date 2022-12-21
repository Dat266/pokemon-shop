import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import classNames from "classnames/bind";
import { v4 as uuidv4 } from "uuid";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import styles from "./Pokemon.module.scss";
import userServices from "../../services/userServices";
import { addToCart } from "../../redux/cartSlice";

const cx = classNames.bind(styles);

export default function Pokemon() {
    const [pokemons, setPokemons] = useState([]);
    const [nextUrl, setNextUrl] = useState("");
    const [load, setLoad] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);

    useEffect(() => {
        (async function fetchPokemon() {
            const res = await axios.get(
                "https://pokeapi.co/api/v2/pokemon?limit=20&offset=20"
            );

            setNextUrl(res.data.next);

            res.data.results.forEach(async (pokemon) => {
                const poke = await axios.get(
                    `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
                );

                const data = {
                    id: uuidv4(),
                    name: poke.data.name,
                    img: poke.data.sprites.front_default,
                    abilities: poke.data.abilities,
                    weight: poke.data.weight,
                    types: poke.data.types,
                    price: poke.data.base_experience,
                };

                setPokemons((p) => [...p, data]);
            });
        })();
    }, []);

    const getUser = JSON.parse(localStorage.getItem("user"));

    const onLogout = async () => {
        const getToken = JSON.parse(localStorage.getItem("user"));

        try {
            await toast.promise(
                userServices.logout(getToken.accesstoken),
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

            localStorage.removeItem("user");
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    const onAdd = (id) => {
        const product = pokemons.find((item) => item.id === id);
        dispatch(addToCart(product));
    };

    const nextPage = async () => {
        setLoad(true);
        const res = await axios.get(nextUrl);
        setNextUrl(res.data.next);
        res.data.results.forEach(async (pokemon) => {
            const poke = await axios.get(
                `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
            );
            const data = {
                id: uuidv4(),
                name: poke.data.name,
                img: poke.data.sprites.front_default,
                abilities: poke.data.abilities,
                weight: poke.data.weight,
                types: poke.data.types,
                price: poke.data.base_experience,
            };
            setPokemons((p) => [...p, data]);
            setLoad(false);
        });
    };

    const renderPokemons = pokemons.map((item) => {
        return (
            <div className={cx("container")}>
                <div className={cx("item")} key={item.id}>
                    <div className={cx("face", "front")}>
                        {" "}
                        <img className={cx("image")} src={item.img} />
                        <h3>{item.name}</h3>
                        <p>{item.price}$</p>
                    </div>
                    <div className={cx("face", "back")}>
                        <p>
                            Abilities:{" "}
                            {item?.abilities.map((el) => {
                                return <span>{el.ability.name}</span>;
                            })}
                        </p>
                        <p>
                            Types:{" "}
                            {item.types.map((el) => {
                                return (
                                    <>
                                        <span>{el.type.name}</span>
                                        <br />
                                    </>
                                );
                            })}
                        </p>
                        <p>Weight: {item.weight}kg</p>
                    </div>
                </div>
                <div className={cx("btn")}>
                    <button onClick={() => onAdd(item.id)}>BUY</button>
                </div>
            </div>
        );
    });

    return (
        <>
            <div className={cx("header")}>
                <h1>Pokemon Shop</h1>
                <div className={cx("action")}>
                    <div className={cx("cart-icon")}>
                        <Link to="/cart">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={20}
                                height={20}
                                fill="currentColor"
                                className="bi bi-bag"
                                viewBox="0 0 16 16"
                            >
                                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                            </svg>
                        </Link>
                        <p>{cart.length}</p>
                    </div>

                    <h2>{getUser?.userName}</h2>
                    <button onClick={onLogout}>Đăng xuất</button>
                </div>
            </div>
            <div className={cx("wrapper")}>{renderPokemons}</div>
            <div className={cx("more")}>
                <button onClick={nextPage}>
                    {load ? "Loading ..." : "Load more"}
                </button>
            </div>
        </>
    );
}
