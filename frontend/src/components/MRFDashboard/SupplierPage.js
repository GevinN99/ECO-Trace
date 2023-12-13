import React, {useEffect, useState} from "react";
import axios from "axios";
import MRFNavBar from "./MRFNavBar";
import Footer from "../Footer";

export default function SupplierPage() {

    const userId = localStorage.getItem('userId');
    const [suppliers, setSuppliers] = useState([]);
    const [showNav, setShowNav] = useState(false);

    useEffect(() => {
        const fetchSuppliers = async () => {
            const response = await axios.get(`http://localhost:8070/MRF/getUserSuppliers/${userId}`);
            setSuppliers(response.data.data);
        };

        fetchSuppliers();
    }, [userId]);

    return (
        <div>
        <div className="container mt-5 pt-5">
            <MRFNavBar showNav={showNav} setShowNav={setShowNav} />
            <h1 className="text-center mb-4 fw-bold">My Suppliers</h1>
            {suppliers.map(supplier => (
                <div key={supplier.supplierId} className="card mb-3">
                    <div className="card-body">
                        <h2 className="card-title">{supplier.supplierName}</h2>
                        <p className="card-text"><strong>ID:</strong> {supplier.supplierId}</p>
                        <p className="card-text"><strong>Address:</strong> {supplier.supplierAddress}</p>
                        <p className="card-text"><strong>Contact:</strong> {supplier.supplierContact}</p>
                        <p className="card-text"><strong>Email:</strong> {supplier.supplierEmail}</p>
                        <p className="card-text"><strong>Type:</strong> {supplier.supplierType}</p>
                    </div>
                </div>
            ))}
        </div>
            <Footer/>
        </div>
    );
}