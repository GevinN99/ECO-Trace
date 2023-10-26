import React, { useState } from "react";
import axios from "axios";

export default function SignupPage() {
    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        type: "",
        userName: "",
        password: "",
    });

    const handleFirstNameChange = (e) => {
        setValues({
            ...values,
            firstName: e.target.value,
            userName: e.target.value + "-" + values.lastName,
        });
    };

    const handleLastNameChange = (e) => {
        setValues({
            ...values,
            lastName: e.target.value,
            userName: values.firstName + "-" + e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8070/user/register", values);
            console.log(response);
            localStorage.setItem("token", response.data.token);
            window.location.href = "/login";
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="SignupPage">
            <div className="form-box">
                <div className="form-image"></div>
                <form onSubmit={handleSubmit}>
                    <div className="form-outline mb-4">
                        <input
                            type="text"
                            placeholder="Enter First Name"
                            value={values.firstName}
                            onChange={handleFirstNameChange}
                            className="form-control"
                        />
                        <label className="form-label" htmlFor="form2Example1">
                            First Name
                        </label>
                    </div>

                    <div className="form-outline mb-4">
                        <input
                            type="text"
                            placeholder="Enter Last Name"
                            value={values.lastName}
                            onChange={handleLastNameChange}
                            className="form-control"
                        />
                        <label className="form-label" htmlFor="form2Example1">
                            Last Name
                        </label>
                    </div>

                    <div className="form-outline mb-4">
                        <select
                            value={values.type}
                            onChange={(e) => setValues({ ...values, type: e.target.value })}
                            className="form-select"
                            aria-label="Default select example"
                        >
                            <option disabled value="">
                                Select User Type
                            </option>
                            <option value="Admin">Admin</option>
                            <option value="CEA">CEA</option>
                            <option value="MRF">MRF</option>
                        </select>
                        <label className="form-label" htmlFor="form2Example1">
                            Select Your Account Type
                        </label>
                    </div>

                    <div className="form-outline mb-4">
                        <input
                            type="text"
                            placeholder="Auto-generated User Name"
                            value={values.userName}
                            readOnly
                            className="form-control"
                        />
                        <label className="form-label" htmlFor="form2Example1">
                            User Name
                        </label>
                    </div>

                    <div className="form-outline mb-4">
                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={values.password}
                            onChange={(e) => setValues({ ...values, password: e.target.value })}
                            className="form-control"
                        />
                        <label className="form-label" htmlFor="form2Example2">
                            Password
                        </label>
                    </div>

                    <button type="submit" className="btn custom-btn">
                        Sign in
                    </button>
                </form>
            </div>
        </div>
    );
}
