import React, {useState} from "react";
import axios from "axios";

export default function CategoryCreation() {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
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
        <div className="d-flex justify-content-center align-items-center" style={{height: "90vh"}}>
            <div className="form-box">
                <h2 className="text-center fw-bold">Categorized Data</h2>
                <form onSubmit={handleSubmit}>
                    {error && <div className="error-message">{error}</div>}
                    {success && <div className="success-message">{success}</div>}
                    <div className="form-outline mb-4">
                        <label className="form-label">PET (Kg)</label>
                        <input type="text" name="PET" placeholder="PET (Kg)" value={values.PET} onChange={handleInputChange} className="form-control" />
                    </div>
                    <div className="form-outline mb-4">
                        <label className="form-label">HDPE (Kg)</label>
                        <input type="text" name="HDPE" placeholder="HDPE (Kg)" value={values.HDPE} onChange={handleInputChange} className="form-control" />
                    </div>
                    <div className="form-outline mb-4">
                        <label className="form-label">LDPE (Kg)</label>
                        <input type="text" name="LDPE" placeholder="LDPE (Kg)" value={values.LDPE} onChange={handleInputChange} className="form-control" />
                    </div>
                    <div className="form-outline mb-4">
                        <label className="form-label">PP (Kg)</label>
                        <input type="text" name="PP" placeholder="PP (Kg)" value={values.PP} onChange={handleInputChange} className="form-control" />
                    </div>
                    <div className="form-outline mb-4">
                        <label className="form-label">PS (Kg)</label>
                        <input type="text" name="PS" placeholder="PS (Kg)" value={values.PS} onChange={handleInputChange} className="form-control" />
                    </div>
                    <div className="form-outline mb-4">
                        <label className="form-label">PVC (Kg)</label>
                        <input type="text" name="PVC" placeholder="PVC (Kg)" value={values.PVC} onChange={handleInputChange} className="form-control" />
                    </div>
                    <button type="submit" className="btn custom-btn">Add Category</button>
                </form>
            </div>
        </div>
    );
}
