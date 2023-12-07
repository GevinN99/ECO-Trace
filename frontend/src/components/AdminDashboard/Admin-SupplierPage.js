import React, { useState, useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import AdminNavBar from "./AdminNavBar";
import {IoChevronBackSharp} from "react-icons/io5";

export default function AdminSupplierPage() {
    const navigate = useNavigate();
    const { userId } = useParams();
    const [suppliers, setSuppliers] = useState([]);
    const [editSupplierId, setEditSupplierId] = useState(null);

    useEffect(() => {
        const fetchSuppliers = async () => {
            const response = await axios.get(`http://localhost:8070/Admin/getUserSuppliers/${userId}`);
            setSuppliers(response.data.data);
        };
        fetchSuppliers();
    }, [userId]);

    const updateSupplier = async (supplierId) => {
        const supplierToUpdate = suppliers.find((supplier) => supplier.supplierId === supplierId);
        try {
            const response = await axios.put(`http://localhost:8070/Admin/updateSupplier/${supplierId}`, supplierToUpdate);
            if (response.data.status === 'success') {
                alert('Supplier updated successfully');
                setEditSupplierId(null);
            } else {
                console.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const deleteSupplier = async (supplierId) => {
        try {
            const response = await axios.delete(`http://localhost:8070/Admin/deleteSupplier/${supplierId}`);
            if (response.data.status === 'success') {
                alert('Supplier deleted successfully');
                setSuppliers(suppliers.filter((supplier) => supplier.supplierId !== supplierId));
            } else {
                console.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleInputChange = (event, supplierId) => {
        const { name, value } = event.target;
        setSuppliers(suppliers.map((supplier) => supplier.supplierId === supplierId ? { ...supplier, [name]: value } : supplier));
    };

    return (
        <div className="container mt-5 pt-5">
            <AdminNavBar />
            <div className="row">
                <div className="col-2">
                    <button className="btn btn-dark admin-btn" onClick={() => navigate(-1)}><IoChevronBackSharp/></button>
                </div>
                <div className="col-1"></div>
                <div className="col-6">
                    <h1 className="text-center mb-4 fw-bold">Suppliers</h1>
                </div>
                <div className="col"></div>
            </div>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col">Supplier Name</th>
                    <th scope="col">ID</th>
                    <th scope="col">Address</th>
                    <th scope="col">Contact</th>
                    <th scope="col">Email</th>
                    <th scope="col">Type</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {suppliers.map(supplier => (
                    <tr key={supplier.supplierId}>
                        <td>
                            {editSupplierId === supplier.supplierId ?
                                <input type="text" name="supplierName" value={supplier.supplierName} onChange={(e) => handleInputChange(e, supplier.supplierId)} /> :
                                supplier.supplierName}
                        </td>
                        <td>{supplier.supplierId}</td>
                        <td>
                            {editSupplierId === supplier.supplierId ?
                                <input type="text" name="supplierAddress" value={supplier.supplierAddress} onChange={(e) => handleInputChange(e, supplier.supplierId)} /> :
                                supplier.supplierAddress}
                        </td>
                        <td>
                            {editSupplierId === supplier.supplierId ?
                                <input type="text" name="supplierContact" value={supplier.supplierContact} onChange={(e) => handleInputChange(e, supplier.supplierId)} /> :
                                supplier.supplierContact}
                        </td>
                        <td>
                            {editSupplierId === supplier.supplierId ?
                                <input type="text" name="supplierEmail" value={supplier.supplierEmail} onChange={(e) => handleInputChange(e, supplier.supplierId)} /> :
                                supplier.supplierEmail}
                        </td>
                        <td>
                            {editSupplierId === supplier.supplierId ?
                                <select name="supplierType" value={supplier.supplierType} onChange={(e) => handleInputChange(e, supplier.supplierId)}>
                                    <option disabled value=""> Select Supplier Type </option>
                                    <option value="permanent">Permanent</option>
                                    <option value="temporary">Temporary</option>
                                </select>
                                : supplier.supplierType}
                        </td>
                        <td>
                            {editSupplierId === supplier.supplierId ?
                                <>
                                    <button className="btn btn-secondary me-2" onClick={() => setEditSupplierId(null)}>Cancel</button>
                                    <button className="btn btn-success me-2" onClick={() => updateSupplier(supplier.supplierId)}>Save</button>
                                </> :
                                <button className="btn btn-dark me-2" onClick={() => setEditSupplierId(supplier.supplierId)}>Edit</button>}
                            <button className="btn btn-outline-danger" onClick={() => deleteSupplier(supplier.supplierId)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
