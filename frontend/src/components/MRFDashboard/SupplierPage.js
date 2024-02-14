import React, {useEffect, useState} from "react";
import axios from "axios";
import MRFNavBar from "./MRFNavBar";
import Footer from "../Footer";
import {Table, Button, Container} from "react-bootstrap";
import {CgProfile} from "react-icons/cg";

export default function SupplierPage() {

    const userId = localStorage.getItem('userId');
    const [suppliers, setSuppliers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showNav, setShowNav] = useState(false);

    useEffect(() => {
        const fetchSuppliers = async () => {
            const response = await axios.get(`http://localhost:8070/MRF/getUserSuppliers/${userId}`);
            setSuppliers(response.data.data);
        };

        fetchSuppliers();
    }, [userId]);

    const filteredSuppliers = suppliers.filter(supplier =>
        supplier.supplierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.supplierId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.supplierEmail.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="container mt-5 pt-5">
                <MRFNavBar showNav={showNav} setShowNav={setShowNav} />
                <h1 className="text-center mb-4 fw-bold">My Suppliers</h1>

                <input
                    type="text"
                    className="form-control mb-4"
                    placeholder="Search Supplier"
                    onChange={event => setSearchTerm(event.target.value)}
                />

                <Container fluid="md" className="table-responsive">
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>ID</th>
                            <th>Address</th>
                            <th>Contact</th>
                            <th>Email</th>
                            <th>Type</th>
                            <th>Profile</th>
                        </tr>
                        </thead>
                        <tbody className="text-center">
                        {filteredSuppliers.map(supplier => (
                            <tr key={supplier.supplierId}>
                                <td>{supplier.supplierName}</td>
                                <td>{supplier.supplierId}</td>
                                <td>{supplier.supplierAddress}</td>
                                <td>{supplier.supplierContact}</td>
                                <td>{supplier.supplierEmail}</td>
                                <td style={{ color: supplier.supplierType === 'permanent' ? 'green' : 'red' }}>
                                    <b>{supplier.supplierType}</b>
                                </td>
                                <td><Button className="btn-dark rounded-5" href={`/supplierProfile/${supplier.supplierId}`}><CgProfile /></Button></td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Container>
            </div>
            <Footer/>
        </div>
    );
}
