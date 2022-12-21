import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div>
            {" "}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid d-flex justify-content-between w">
                    <div>
                        <Link className="navbar-brand" to="/home">
                            MetaverseShop
                        </Link>
                    </div>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarNavAltMarkup"
                    >
                        <div className="navbar-nav">
                            <Link
                                className="nav-link active"
                                aria-current="page"
                                to="/album"
                            >
                                Album
                            </Link>
                            <Link
                                className="nav-link active"
                                aria-current="page"
                                to="/upload"
                            >
                                Upload
                            </Link>
                        </div>
                        <div>
                            <img
                                src="https://i.pinimg.com/originals/ee/94/62/ee9462aafc151e9a57f4f32d4fd9e1dd.jpg"
                                alt="minion"
                            />
                            <span>Name</span>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;
