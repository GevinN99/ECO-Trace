import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import "./AdminDashBoard.css";
import AdminNavBar from "./AdminNavBar";
import AdminCEADashBoard from "./Admin-CEADashboard";

export default function AdminDashBoard() {
    const [auth, setAuth] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        axios.get("http://localhost:8070/Admin/AdminDashBoard").then((response) => {
            if (response.data.status === "success") {
                setAuth(true);
                navigate('/AdminDashboard');
            } else {
                setAuth(false);
                setMessage(response.data.message);
            }
        }).catch((error) => {
            console.error(error);
        });
    }, []);

    return (
        <div className={`AdminDashBoard ${auth ? "menuDisplayed" : ""}`}>
            <AdminNavBar/>
            <div id="wrapper">
                <div className="container p-5" style={{marginTop: '3%'}}>
                    <div className="text-center mb-5">
                        <h1>Welcome Admin!</h1>
                    </div>
                    <div className="row justify-content-around mb-5">
                        <div className="col-lg-3 col-md-6 text-center admin-box">
                            <h2>Create Admin</h2>
                            <Link to="/createadmin" className="btn btn-dark">Create</Link>
                        </div>
                        <div className="col-lg-3 col-md-6 text-center admin-box">
                            <h2>Create CEA</h2>
                            <Link to="/createCEA" className="btn btn-dark">Create</Link>
                        </div>
                        <div className="col-lg-3 col-md-6 text-center admin-box">
                            <h2>Create MRF</h2>
                            <Link to="/createMRF" className="btn btn-dark">Create</Link>
                        </div>
                    </div>
                    <div className="row justify-content-around mb-5">
                        <div className="col-lg-3 col-md-6 text-center admin-box">
                            <h2>View Admins</h2>
                            <Link to="/allAdmins" className="btn btn-dark">View</Link>
                        </div>
                        <div className="col-lg-3 col-md-6 text-center admin-box">
                            <h2>View CEA</h2>
                            <Link to="/AdminCEADashBoard" className="btn btn-dark">View</Link>
                        </div>
                        <div className="col-lg-3 col-md-6 text-center admin-box">
                            <h2>View MRF</h2>
                            <Link to="/allMRFs" className="btn btn-dark">View</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
