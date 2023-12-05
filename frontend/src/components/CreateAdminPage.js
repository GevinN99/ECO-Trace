import React, {useState} from "react";
import axios from "axios";

export default function CreateAdminPage() {
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
            localStorage.setItem("token", response.data.token);
            window.location.href = "/login";
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="SignupPage">
        <div className="d-flex justify-content-center">
                <form onSubmit={handleSubmit}>
                    <br/>
                    <br/>
                    <h1 className="text-center">Create Admin Account</h1>
                    <br/>
                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example1">
                            First Name
                        </label>
                        <input
                            type="text"
                            placeholder="Enter First Name"
                            value={values.firstName}
                            onChange={handleFirstNameChange}
                            className="form-control"
                        />
                    </div>

                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example1">
                            Last Name
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Last Name"
                            value={values.lastName}
                            onChange={handleLastNameChange}
                            className="form-control"
                        />
                    </div>

                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example1">
                            Select Your Account Type
                        </label>
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
                    </div>

                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example1"> User Name </label>
                        <input type="text" placeholder="Auto-generated User Name" value={values.userName} disabled
                               className="form-control"/>
                    </div>

                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example2">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={values.password}
                            onChange={(e) => setValues({ ...values, password: e.target.value })}
                            className="form-control"
                        />
                    </div>

                    <button type="submit" className="btn custom-btn">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}
