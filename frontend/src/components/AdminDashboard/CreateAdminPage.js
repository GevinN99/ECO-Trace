import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import AdminNavBar from "./AdminNavBar";

export default function CreateAdminPage() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        password: "",
    });

    const handleFirstNameChange = (e) => {
        setValues({
            ...values,
            firstName: e.target.value,
            userName: "AD-" + e.target.value + "-" + values.lastName,
        });
    };

    const handleLastNameChange = (e) => {
        setValues({
            ...values,
            lastName: e.target.value,
            userName: "AD-" + values.firstName + "-" + e.target.value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8070/auth/adminRegister", values);
            console.log(response);
            alert("Admin Added Successfully");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="SignupPage container-fluid">
            <div className="row justify-content-center p-3">
                <AdminNavBar/>
                <form className="p-5 col-md-6" onSubmit={handleSubmit}>
                    <br/>
                    <h1 className="text-center">Create Admin Account</h1>
                    <br/>
                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example1">First Name</label>
                        <input type="text" placeholder="Enter First Name" value={values.firstName}
                               onChange={handleFirstNameChange} className="form-control"/>
                    </div>
                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example1">Last Name</label>
                        <input type="text" placeholder="Enter Last Name" value={values.lastName}
                               onChange={handleLastNameChange} className="form-control"/>
                    </div>
                    <div className="form-outline mb-4"></div>
                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example1">User Name</label>
                        <input type="text" placeholder="Auto-generated User Name" value={values.userName} disabled
                               className="form-control"/>
                    </div>
                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example2">Password</label>
                        <input type="password" placeholder="Enter Password" value={values.password}
                               onChange={(e) => setValues({...values, password: e.target.value})}
                               className="form-control"/>
                    </div>
                    <div className="d-flex justify-content-center">
                        <div className="form-check mb-4">
                            <button type="submit" className="btn btn-dark">Register</button>
                        </div>
                        <div className="form-check mb-4">
                            <button className="btn btn-dark" onClick={() => navigate(-1)}>Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
