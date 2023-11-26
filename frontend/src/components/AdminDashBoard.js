import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

export default function AdminDashBoard() {
    const [auth, setAuth] = useState(false);
    const [message, setMessage] = useState("");
    const [userId, setUserId] = useState("");
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get("http://localhost:8070/Admin/AdminDashBoard").then((response) => {
            if (response.data.status === "success") {
                setAuth(true);
                setUserId(response.data.userId);
                navigate('/AdminDashboard');
            } else {
                setAuth(false);
                setMessage(response.data.message);
            }
        }).catch((error) => {
            console.error(error);
        });
    }, []);

    const handleLogout = () => {
        axios.get("http://localhost:8070/auth/logout").then((response) => {
            if (response.data.status === "success") {
                setAuth(false);
                setUserId("");
                navigate('/login');
            } else {
                console.error(response.data.message);
            }
        }).catch((error) => {
            console.error(error);
        });
    };

    return (
        <div className="MRFDashBoard">
            {auth ?
                <div>
                    <h1>You are Authorized --- {userId}</h1>
                    <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
                </div>
                :
                <div>
                    <h1>{message}</h1>
                    <Link to='/login'>Login</Link>
                </div>
            }
        </div>
    );
}
