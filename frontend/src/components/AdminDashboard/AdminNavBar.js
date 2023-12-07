import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {CgProfile} from "react-icons/cg";
import {FaHome} from "react-icons/fa";
import axios from "axios";

export default function AdminNavBar() {
    const [adminProfile, setAdminProfile] = useState({});
    const [showNav, setShowNav] = useState(false);
    const [auth, setAuth] = useState(false);
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        if (userId) {
            axios.get(`http://localhost:8070/Admin/viewAdminProfile/${userId}`)
                .then((response) => {
                    if (response.data.status === 'success') {
                        setAdminProfile(response.data.data);
                    } else {
                        console.error(response.data.message);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, []);

    const handleLogout = () => {
        axios.get("http://localhost:8070/auth/logout").then((response) => {
            if (response.data.status === "success") {
                setAuth(false);
                localStorage.clear();
                navigate('/login');
            } else {
                console.error(response.data.message);
            }
        }).catch((error) => {
            console.error(error);
        });
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div className="container-fluid">
                    <div className="navbar-brand">
                        <CgProfile onClick={() => setShowNav(!showNav)} className="admin-nav-logo"/>
                    </div>
                    <div className="navbar-brand" onClick={() => navigate("/AdminDashBoard")}>
                        <FaHome className="admin-nav-logo"/>
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                            aria-label="Toggle navigation">
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
            {showNav && (
                <div className={`bg-dark text-light p-5 position-fixed h-100 sidebar ${showNav ? 'show' : ''}`}
                     style={{width: '300px', textAlign: 'center'}}>
                    <ul className="list-unstyled p-4">
                        <li className="text-center">User ID: {adminProfile.userId}</li>
                        <li className="text-center">User Name: {adminProfile.userName}</li>
                        <li className="text-center">First Name: {adminProfile.firstName}</li>
                        <li className="text-center">Last Name: {adminProfile.lastName}</li>
                        <Link to={`/admin-dashboard/${userId}`} className="btn btn-outline-light">Update Profile</Link>
                    </ul>
                </div>
            )}
        </div>
    );
}