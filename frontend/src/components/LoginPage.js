import React, {useState} from "react";
import axios from "axios";
import "./CSS/LoginPage.css";
import {useNavigate} from "react-router-dom";

export default function LoginPage() {
    const [values, setValues] = useState({ userName: "", password: "" });
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8070/auth/login", values);
            if (response.data.status === "success") {
                localStorage.setItem('userId', response.data.userId);
                const { role } = response.data;
                switch (role) {
                    case 'Admin': navigate('/AdminDashboard'); break;
                    case 'MRF': navigate('/MRFDashboard'); break;
                    case 'CEA': navigate('/CEADashboard'); break;
                    default: navigate('/home'); break;
                }
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error(error);
            if (error.response) {
                alert(error.response.data.message);
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    return (
        <div className="LoginPage">
            <div className="form-box">
                <h1 className="text-center ">Sign In</h1>
                <br/>
                <form onSubmit={handleSubmit}>
                    <div className="form-outline mb-4">
                        <input type="text" name="userName" placeholder='Enter User-Name' value={values.userName} onChange={handleInputChange} className="form-control" />
                    </div>
                    <div className="form-outline mb-4">
                        <input type="password" placeholder='Enter Password' name="password" value={values.password} onChange={handleInputChange} className="form-control" />
                    </div>
                    <button type='submit' className="btn custom-btn">Sign in</button>
                </form>
            </div>
        </div>
    );
}
