import React, {useState} from "react";
import axios from "axios";
import MRFNavBar from "./MRFNavBar";

export default function SupplierCollection() {
    const userId = localStorage.getItem('userId');
    const [values, setValues] = useState({
        supplierType: "",
        supplierId: "",
        quantity: "",
        amountPaid: ""
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showNav, setShowNav] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:8070/MRF/createCollection',
                { userId, ...values }
            );
            if (response.data.status === "success") {
                setSuccess("Collection added successfully!");
                setError("");
            } else {
                setError(response.data.message);
                setSuccess("");
            }
        } catch (err) {
            setError("An error occurred while adding the collection.");
            setSuccess("");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{height: "100%"}}>
            <MRFNavBar showNav={showNav} setShowNav={setShowNav}/>
            <div className="form-box">
                <h1 className="text-center fw-bold">Add Collection</h1>
                <br/>
                <form onSubmit={handleSubmit}>
                    {error && <div className="error-message">{error}</div>}
                    {success && <div className="success-message">{success}</div>}
                    <div className="form-outline mb-4">
                        <label className="form-label">Select Your Account Type</label>
                        <select name="supplierType" value={values.supplierType} onChange={handleInputChange} className="form-select" aria-label="Default select example" >
                            <option disabled value=""> Select Supplier Type </option>
                            <option value="permanent">Permanent</option>
                            <option value="temporary">Temporary</option>
                        </select>
                    </div>
                    <div className="form-outline mb-4">
                        <label className="form-label">Supplier ID</label>
                        <input type="text" name="supplierId" placeholder="Supplier ID" value={values.supplierId} onChange={handleInputChange} className="form-control" />
                    </div>
                    <div className="form-outline mb-4">
                        <label className="form-label">Quantity</label>
                        <input type="text" name="quantity" placeholder="Quantity" value={values.quantity} onChange={handleInputChange} className="form-control" />
                    </div>
                    <div className="form-outline mb-4">
                        <label className="form-label">Total Amount Paid</label>
                        <input type="text" name="amountPaid" placeholder="Total Amount Paid" value={values.amountPaid} onChange={handleInputChange} className="form-control" />
                    </div>
                    <button type="submit" className="btn custom-btn"> Add Collection </button>
                </form>
            </div>
        </div>
    );
}