import React from "react";
import {useNavigate} from "react-router-dom";
import {CgProfile} from "react-icons/cg";
import {FaHome} from "react-icons/fa";

export default function CEANavBar({showNav, setShowNav, handleLogout}) {
    const navigate = useNavigate();
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container-fluid">
                <div className="navbar-brand">
                    <CgProfile onClick={() => setShowNav(!showNav)} className="cea-nav-logo"/>
                </div>
                <div className="navbar-brand" onClick={() => navigate("/CEADashBoard")}>
                    <FaHome className="cea-nav-logo"/>
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
