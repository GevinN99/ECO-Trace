import React, {useState} from "react";
import axios from "axios";
import "./CraeteMRFPage.css";
import AdminNavBar from "./AdminNavBar";
import {useNavigate} from "react-router-dom";

export default function CreateNewMRFPage() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        district: "",
        localAuthority: "",
        idOrPassportNumber: "",
        collectingLocationAddress: "",
        telephone: "",
        gpsLocation: "",
        userName: "",
        password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        for (let key in values) {
            if (values[key] === "") {
                alert(`Please fill in the ${key} field.`);
                return;
            }
        }

        try {
            const response = await axios.post("http://localhost:8070/auth/mrfRegister", values);
            console.log(response);
            alert(response.data.message);
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data && error.response.data.message === 'Username already exists') {
                alert('Username already exists. Please choose a different username.');
            } else {
                alert('An error occurred.');
            }
        }
    };


    const handleFirstNameChange = (e) => {
        setValues({
            ...values, firstName: e.target.value, userName: e.target.value + "-" + values.lastName,
        });
    };

    const handleLastNameChange = (e) => {
        setValues({
            ...values, lastName: e.target.value, userName: values.firstName + "-" + e.target.value,
        });
    };

    return (
        <div className="SignupPage">
            <AdminNavBar/>
            <div className="mrf-form-box p-5">
                <div className="mrf-form-image"></div>
                <h1 className="mrf-form-title justify-content-center">Register MRF</h1>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-12 col-md-8 offset-md-2">
                            {/* First Name */}
                            <div className="form-outline mb-3">
                                <label className="form-label">First Name</label>
                                <input type="text" placeholder="Enter First Name" name="firstName"
                                       value={values.firstName} onChange={handleFirstNameChange}
                                       className="form-control"/>
                            </div>
                            {/* Last Name */}
                            <div className="form-outline mb-3">
                                <label className="form-label">Last Name</label>
                                <input type="text" placeholder="Enter Last Name" name="lastName" value={values.lastName}
                                       onChange={handleLastNameChange} className="form-control"/>
                            </div>
                            {/* District */}
                            <div className="form-outline mb-3">
                                <label className="form-label">District</label>
                                <input type="text" placeholder="Enter District" name="district" value={values.district}
                                       onChange={(e) => setValues({...values, district: e.target.value})}
                                       className="form-control"/>
                            </div>
                            {/* Local Authority */}
                            <div className="form-outline mb-3">
                                <label className="form-label">Local Authority</label>
                                <input type="text" placeholder="Enter Local Authority" name="localAuthority"
                                       value={values.localAuthority}
                                       onChange={(e) => setValues({...values, localAuthority: e.target.value})}
                                       className="form-control"/>
                            </div>
                            {/* ID/Passport Number */}
                            <div className="form-outline mb-3">
                                <label className="form-label">ID/Passport Number</label>
                                <input type="text" placeholder="Enter ID/Passport Number" name="idOrPassportNumber"
                                       value={values.idOrPassportNumber}
                                       onChange={(e) => setValues({...values, idOrPassportNumber: e.target.value})}
                                       className="form-control"/>
                            </div>
                            {/* Collecting Location Address */}
                            <div className="form-outline mb-3">
                                <label className="form-label">Collecting Location Address</label>
                                <input type="text" placeholder="Enter Collecting Location Address"
                                       name="collectingLocationAddress" value={values.collectingLocationAddress}
                                       onChange={(e) => setValues({
                                           ...values,
                                           collectingLocationAddress: e.target.value
                                       })} className="form-control"/>
                            </div>
                            {/* Telephone */}
                            <div className="form-outline mb-3">
                                <label className="form-label">Telephone</label>
                                <input type="text" placeholder="Enter Telephone" name="telephone"
                                       value={values.telephone}
                                       onChange={(e) => setValues({...values, telephone: e.target.value})}
                                       className="form-control"/>
                            </div>
                            {/* GPS Location */}
                            <div className="form-outline mb-3">
                                <label className="form-label">GPS Location</label>
                                <input type="text" placeholder="Enter GPS Location" name="gpsLocation"
                                       value={values.gpsLocation}
                                       onChange={(e) => setValues({...values, gpsLocation: e.target.value})}
                                       className="form-control"/>
                            </div>
                            {/* User Name */}
                            <div className="form-outline mb-3">
                                <label className="form-label">User Name</label>
                                <input type="text" placeholder="Auto-generated User Name" value={values.userName}
                                       className="form-control"
                                       onChange={(e) => setValues({...values, userName: e.target.value})}/>
                            </div>
                            {/* Password */}
                            <div className="form-outline mb-3">
                                <label className="form-label">Password</label>
                                <input type="password" placeholder="Enter Password" name="password"
                                       value={values.password}
                                       onChange={(e) => setValues({...values, password: e.target.value})}
                                       className="form-control"/>
                            </div>
                            {/* Buttons */}
                            <div className="d-flex justify-content-center p-2">
                                <div className="form-check mb-4">
                                    <button type="submit" className="btn btn-dark">Register</button>
                                </div>
                                <div className="form-check mb-4">
                                    <button className="btn btn-dark"
                                            onClick={() => navigate("/AdminDashBoard")}>Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );

}