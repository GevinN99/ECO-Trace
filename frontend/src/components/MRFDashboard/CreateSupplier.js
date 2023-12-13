import React, {useEffect, useState} from "react";
import axios from "axios";
import MRFNavBar from "./MRFNavBar";
import {useNavigate} from "react-router-dom";
import Footer from "../Footer";

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
    const navigate = useNavigate();

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
        <div>
        <div className="container d-flex justify-content-center" style={{height: "100%"}}>
            <MRFNavBar showNav={showNav} setShowNav={setShowNav} />
            <div className="supplier-form-box col-md-8 p-5">
                <h1 className="text-center fw-bold p-5">Add Collection</h1>
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
                    <div className="d-grid gap-3">
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-dark w-100">Create Supplier</button>
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


