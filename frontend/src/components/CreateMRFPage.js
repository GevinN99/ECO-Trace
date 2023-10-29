import React, {useState} from "react";
import axios from "axios";
import "./CSS/CraeteMRFPage.css";

export default function CreateNewMRFPage() {
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
            <div className="mrf-form-box">
                <div className="mrf-form-image"></div>
                <h1 className="mrf-form-title justify-content-center">Register MRF</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-outline col-md-8 offset-md-2">
                        <input
                            type="text"
                            placeholder="Enter First Name"
                            name="firstName"
                            value={values.firstName}
                            onChange={handleFirstNameChange}
                            className="form-control"
                        />
                        <label className="form-label" htmlFor="form2Example1">
                            First Name
                        </label>
                    </div>

                    <div className="form-outline col-md-8 offset-md-2">
                        <input
                            type="text"
                            placeholder="Enter Last Name"
                            name="lastName"
                            value={values.lastName}
                            onChange={handleLastNameChange}
                            className="form-control"
                        />
                        <label className="form-label" htmlFor="form2Example1">
                            Last Name
                        </label>
                    </div>

                    <div className="form-outline col-md-8 offset-md-2">
                        <input
                            type="text"
                            placeholder="Enter District"
                            name="district"
                            value={values.district}
                            onChange={(e) => setValues({ ...values, district: e.target.value })}
                            className="form-control"
                        />
                        <label className="form-label" htmlFor="form2Example1">
                            District
                        </label>
                    </div>

                    <div className="form-outline col-md-8 offset-md-2">
                        <input
                            type="text"
                            placeholder="Enter Local Authority"
                            name="localAuthority"
                            value={values.localAuthority}
                            onChange={(e) => setValues({ ...values, localAuthority: e.target.value })}
                            className="form-control"
                        />
                        <label className="form-label" htmlFor="form2Example1">
                            Local Authority
                        </label>
                    </div>

                    <div className="form-outline col-md-8 offset-md-2">
                        <input
                            type="text"
                            placeholder="Enter ID/Passport Number"
                            name="idOrPassportNumber"
                            value={values.idOrPassportNumber}
                            onChange={(e) => setValues({ ...values, idOrPassportNumber: e.target.value })}
                            className="form-control"
                        />
                        <label className="form-label" htmlFor="form2Example1">
                            ID/Passport Number
                        </label>
                    </div>

                    <div className="form-outline col-md-8 offset-md-2">
                        <input
                            type="text"
                            placeholder="Enter Collecting Location Address"
                            name="collectingLocationAddress"
                            value={values.collectingLocationAddress}
                            onChange={(e) => setValues({ ...values, collectingLocationAddress: e.target.value })}
                            className="form-control"
                        />
                        <label className="form-label" htmlFor="form2Example1">
                            Collecting Location Address
                        </label>
                    </div>

                    <div className="form-outline col-md-8 offset-md-2">
                        <input
                            type="text"
                            placeholder="Enter Telephone"
                            name="telephone"
                            value={values.telephone}
                            onChange={(e) => setValues({ ...values, telephone: e.target.value })}
                            className="form-control"
                        />
                        <label className="form-label" htmlFor="form2Example1">
                            Telephone
                        </label>
                    </div>

                    <div className="form-outline col-md-8 offset-md-2">
                        <input
                            type="text"
                            placeholder="Enter GPS Location"
                            name="gpsLocation"
                            value={values.gpsLocation}
                            onChange={(e) => setValues({ ...values, gpsLocation: e.target.value })}
                            className="form-control"
                        />
                        <label className="form-label" htmlFor="form2Example1">
                            GPS Location
                        </label>
                    </div>

                    <div className="form-outline col-md-8 offset-md-2">
                        <input
                            type="text"
                            placeholder="Auto-generated User Name"
                            value={values.userName}
                            className="form-control"
                            onChange={(e) => setValues({ ...values, userName: e.target.value })}
                        />
                        <label className="form-label" htmlFor="form2Example1">
                            User Name
                        </label>
                    </div>

                    <div className="form-outline col-md-8 offset-md-2">
                        <input
                            type="password"
                            placeholder="Enter Password"
                            name="password"
                            value={values.password}
                            onChange={(e) => setValues({ ...values, password: e.target.value })}
                            className="form-control"
                        />
                        <label className="form-label" htmlFor="form2Example1">
                            Password
                        </label>
                    </div>

                    <div className="form-outline col-md-4 offset-md-4 justify-content-center">
                    <button type="submit" className="btn custom-btn">
                        Register
                    </button>
                    </div>

                </form>
            </div>
        </div>
    );
}