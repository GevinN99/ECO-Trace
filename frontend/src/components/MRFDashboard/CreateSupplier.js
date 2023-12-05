import React, { useState, useEffect } from "react";
import axios from "axios";
import MRFNavBar from "./MRFNavBar";

export default function CreateSupplier() {

    const userId = localStorage.getItem('userId');

    const [values, setValues] = useState({
        supplierName: "",
        supplierId: "",
        supplierAddress: "",
        supplierContact: "",
        supplierEmail: "",
        supplierType: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showNav, setShowNav] = useState(false);

    useEffect(() => {
        const fetchSupplierId = async () => {
            const response = await axios.get('http://localhost:8070/MRF/generateSupplierId');
            setValues(values => ({ ...values, supplierId: response.data.supplierId }));
        };

        fetchSupplierId();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:8070/MRF/createSupplier',
                { userId, ...values }
            );
            if (response.data.status === "success") {
                setSuccess("Supplier created successfully!");
                setError("");
            } else {
                setError(response.data.message);
                setSuccess("");
            }
        } catch (err) {
            setError("An error occurred while creating the supplier.");
            setSuccess("");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    return (
        <div className="container d-flex justify-content-center" style={{height: "100%"}}>
            <MRFNavBar showNav={showNav} setShowNav={setShowNav} />
            <div className="form-box col-md-8">
                <br/>
                <h1 className="text-center fw-bold">Add Collection</h1>
                <br/>
                <form onSubmit={handleSubmit}>
                    {error && <div className="alert alert-danger">{error}</div>}
                    {success && <div className="alert alert-success">{success}</div>}
                    <div className="form-outline mb-4">
                        <label className="form-label">Supplier ID</label>
                        <input type="text" name="supplierId" value={values.supplierId} readOnly className="form-control" />
                    </div>
                    <div className="form-outline mb-4">
                        <label className="form-label">Supplier Name</label>
                        <input type="text" name="supplierName" placeholder="Supplier Name" value={values.supplierName} onChange={handleInputChange} className="form-control" />
                    </div>
                    <div className="form-outline mb-4">
                        <label className="form-label">Supplier Address</label>
                        <input type="text" name="supplierAddress" placeholder="Supplier Address" value={values.supplierAddress} onChange={handleInputChange} className="form-control" />
                    </div>
                    <div className="form-outline mb-4">
                        <label className="form-label">Supplier Contact</label>
                        <input type="text" name="supplierContact" placeholder="Supplier Contact" value={values.supplierContact} onChange={handleInputChange} className="form-control" />
                    </div>
                    <div className="form-outline mb-4">
                        <label className="form-label">Supplier Email</label>
                        <input type="text" name="supplierEmail" placeholder="Supplier Email" value={values.supplierEmail} onChange={handleInputChange} className="form-control" />
                    </div>
                    <div className="form-outline mb-4">
                        <label className="form-label">Supplier Type</label>
                        <select name="supplierType" value={values.supplierType} onChange={handleInputChange} className="form-select" aria-label="Default select example" >
                            <option disabled value=""> Select Supplier Type </option>
                            <option value="permanent">Permanent</option>
                            <option value="temporary">Temporary</option>
                        </select>
                    </div>
                    <button type="submit" className="btn custom-btn w-100">Create Supplier</button>
                </form>
            </div>
        </div>
    );
}


