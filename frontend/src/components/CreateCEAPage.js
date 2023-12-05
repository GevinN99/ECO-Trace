import React, {useState} from "react";
import axios from "axios";
import "./CSS/CreateCEAPage.css";

export default function CreateNewCEAPage() {
    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        address: "",
        employeeId: "",
        occupation: "",
        userName: "",
        password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8070/auth/ceaRegister", values);
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
            <div className="cea-form-box">
                <div className="cea-form-image"></div>
                <h1 className="cea-form-title justify-content-center">Register CEA</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-outline col-md-8 offset-md-2">
                        <label className="form-label" htmlFor="form2Example1">
                            First Name
                        </label>
                        <input
                            type="text"
                            placeholder="Enter First Name"
                            name="firstName"
                            value={values.firstName}
                            onChange={handleFirstNameChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-outline col-md-8 offset-md-2">
                        <label className="form-label" htmlFor="form2Example1">
                            Last Name
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Last Name"
                            name="lastName"
                            value={values.lastName}
                            onChange={handleLastNameChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-outline col-md-8 offset-md-2">
                        <label className="form-label" htmlFor="form2Example1">
                            Address
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Address"
                            name="address"
                            value={values.address}
                            onChange={(e) => setValues({...values, address: e.target.value})}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-outline col-md-8 offset-md-2">
                        <label className="form-label" htmlFor="form2Example1">
                            Employee ID
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Employee ID"
                            name="employeeId"
                            value={values.employeeId}
                            onChange={(e) => setValues({...values, employeeId: e.target.value})}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-outline col-md-8 offset-md-2">
                        <label className="form-label" htmlFor="form2Example1">
                            Occupation
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Occupation"
                            name="occupation"
                            value={values.occupation}
                            onChange={(e) => setValues({...values, occupation: e.target.value})}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-outline col-md-8 offset-md-2">
                        <label className="form-label" htmlFor="form2Example1">
                            Username
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Username"
                            name="userName"
                            value={values.userName}
                            onChange={(e) => setValues({...values, userName: e.target.value})}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-outline col-md-8 offset-md-2">
                        <label className="form-label" htmlFor="form2Example1">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            name="password"
                            value={values.password}
                            onChange={(e) => setValues({ ...values, password: e.target.value })}
                            className="form-control"
                        />
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