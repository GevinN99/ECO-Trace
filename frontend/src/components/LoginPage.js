import React, {useState} from "react";
import axios from "axios";
import "./LoginPage.css";
import {useNavigate} from "react-router-dom";
import {Button, Form, FormGroup, Input, Label} from 'reactstrap';
import {IoMdSunny} from "react-icons/io";
import {GiMoon} from "react-icons/gi";

export default function LoginPage() {
    const [darkMode, setDarkMode] = useState(false);
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

    const handleDarkModeToggle = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle('dark-mode');
    };

    return (
        <div className={`LoginPage ${darkMode ? 'dark-mode' : ''}`}>

            <div onClick={handleDarkModeToggle} className="dark-mode-toggle ">
                <div className="row text-center">
                    <div className="col">
                        {darkMode ? <IoMdSunny className="lite-btn"/> : <GiMoon className="dark-btn"/>}
                    </div>
                    <div className="col>">
                        {darkMode ? <div style={{fontSize:10}}>Light Mode</div> : <div style={{fontSize:10}}>Dark Mode</div>}
                    </div>
                </div>
                    </div>

            <div className="form-box">
                <h1 className="text-center text-light mb-4">Sign In</h1>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="userName" className="text-light">Username</Label>
                        <Input type="text" name="userName" id="userName" value={values.userName}
                               onChange={handleInputChange} className="form-control"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password" className="text-light">Password</Label>
                        <Input type="password" name="password" id="password" value={values.password}
                               onChange={handleInputChange} className="form-control"/>
                    </FormGroup>
                    <div className="pt-3 pb-3">
                        <Button className="custom-btn w-100">Sign in</Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}