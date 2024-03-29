import React, {useState} from "react";
import axios from "axios";
import MRFNavBar from "./MRFNavBar";
import {useNavigate} from "react-router-dom";
import Footer from "../Footer";

export default function CategoryCreation() {
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');
    const [values, setValues] = useState({
        PET: "",
        HDPE: "",
        LDPE: "",
        PP: "",
        PS: "",
        PVC: ""
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showNav, setShowNav] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Object.values(values).every(value => value === "")) {
            setError("No data to add. Please fill out at least one field.");
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:8070/MRF/createCategory',
                { userId, ...values }
            );
            if (response.data.status === "success") {
                setSuccess("Category added successfully!");
                alert("Category added successfully!");
                setError("");
            } else {
                setError(response.data.message);
                setSuccess("");
            }
        } catch (err) {
            setError("An error occurred while adding the category.");
            setSuccess("");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    return (
        <div>
        <div className="d-flex justify-content-center vh-90">
            <MRFNavBar showNav={showNav} setShowNav={setShowNav} />
            <div className="supplier-form-box col-md-8 col-sm-12 p-5">
                <h2 className="text-center fw-bold p-5">Categorized Data</h2>
                <form onSubmit={handleSubmit}>
                    {error && <div className="error-message">{error}</div>}
                    {success && <div className="success-message">{success}</div>}
                    <div className="row">
                        <div className="col-md-6 col-sm-12 form-outline mb-4">
                            <label className="form-label">PET (Kg) :</label>
                            <input type="text" name="PET" placeholder="PET (Kg)" value={values.PET} onChange={handleInputChange} className="form-control" />
                        </div>
                        <div className="col-md-6 col-sm-12 form-outline mb-4">
                            <label className="form-label">HDPE (Kg) :</label>
                            <input type="text" name="HDPE" placeholder="HDPE (Kg)" value={values.HDPE} onChange={handleInputChange} className="form-control" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 form-outline mb-4">
                            <label className="form-label">LDPE (Kg) :</label>
                            <input type="text" name="LDPE" placeholder="LDPE (Kg)" value={values.LDPE} onChange={handleInputChange} className="form-control" />
                        </div>
                        <div className="col-md-6 form-outline mb-4">
                            <label className="form-label">PP (Kg) :</label>
                            <input type="text" name="PP" placeholder="PP (Kg)" value={values.PP} onChange={handleInputChange} className="form-control" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 form-outline mb-4">
                            <label className="form-label">PS (Kg) :</label>
                            <input type="text" name="PS" placeholder="PS (Kg)" value={values.PS} onChange={handleInputChange} className="form-control" />
                        </div>
                        <div className="col-md-6 form-outline mb-4">
                            <label className="form-label">PVC (Kg)</label>
                            <input type="text" name="PVC" placeholder="PVC (Kg)" value={values.PVC} onChange={handleInputChange} className="form-control" />
                        </div>
                    </div>
                    <div className="d-grid gap-3">
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-dark w-50 mt-3">Add Category</button>
                        </div>
                        <div className="d-flex justify-content-center">
                            <button className="btn btn-dark w-25 mt-3" onClick={() => navigate(-1)}>Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
            <Footer/>
        </div>
    );
}