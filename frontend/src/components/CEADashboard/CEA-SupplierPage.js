import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import CEANavBar from "./CEANavBar";
import {IoChevronBackSharp} from "react-icons/io5";

export default function CEASupplierPage() {
    const {userId} = useParams();
    const [suppliers, setSuppliers] = useState([]);
    const [showNav, setShowNav] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {

        const fetchSuppliers = async () => {
            const response = await axios.get(`http://localhost:8070/MRF/getUserSuppliers/${userId}`);
            setSuppliers(response.data.data);
        };

        fetchSuppliers();
    }, [userId]);

    return (
        <div className="container mt-5 pt-5">
            <CEANavBar showNav={showNav} setShowNav={setShowNav}/>

            <div className="row">
                <div className="col-2">
                    <button className="btn btn-dark mrf-btn" onClick={() => navigate(-1)}>
                        <IoChevronBackSharp/>
                    </button>
                </div>
                <div className="col-2"></div>
                <div className="col-4">
                    <h1 className="text-center mb-4 fw-bold">My Suppliers</h1>
                </div>
                <div className="col-4"></div>
            </div>


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
    );
}