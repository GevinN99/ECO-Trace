import React, {useEffect, useState} from "react";
import axios from "axios";
import MRFNavBar from "./MRFNavBar";
import {useNavigate} from "react-router-dom";
import Footer from "../Footer";
import {Container, ListGroup, Table} from "react-bootstrap";

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
    const [searchTerm, setSearchTerm] = useState('');
    const [suppliers, setSuppliers] = useState([]);
    const navigate = useNavigate();

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

    const handleSupplierSelect = (supplier) => {
        setValues({
            ...values,
            supplierId: supplier.supplierId,
            supplierType: supplier.supplierType
        });
    };

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
                alert("Collection added successfully!");
                setValues({
                    supplierType: "",
                    supplierId: "",
                    quantity: "",
                    amountPaid: ""
                });
            } else {
                setError(response.data.message);
                setSuccess("");
                alert(response.data.message);
            }
        } catch (err) {
            setError("An error occurred while adding the collection.");
            setSuccess("");
            alert(err);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    return (
        <div>
            <div className="d-flex justify-content-center align-items-center supplier-page" style={{height: "100%"}}>
                <MRFNavBar showNav={showNav} setShowNav={setShowNav}/>
                <div className="supplier-form-box p-5">
                    <br/>
                    <h1 className="text-center fw-bold p-3">Add Collection</h1>
                    <button className="btn btn-dark mrf-btn" onClick={() => navigate("/SupplierPDF/")}> Generate
                        PDF
                    </button>
                    <form onSubmit={handleSubmit} className="bg-light" id="collectionForm">
                        <input type="text" className="form-control rounded-bottom-0" placeholder="Search Supplier"
                               onChange={event => setSearchTerm(event.target.value)}/>
                        {searchTerm && (
                            <ListGroup variant="flush" className="rounded-bottom-5 ">
                                {filteredSuppliers.map(supplier => (
                                    <ListGroup.Item action key={supplier.supplierId}
                                                    onClick={() => handleSupplierSelect(supplier)}
                                                    style={{backgroundColor: "darkgray"}}>
                                        {supplier.supplierName}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                        <div className="form-outline mb-4 pt-4">
                            <label className="form-label">Select Your Account Type</label>
                            <select name="supplierType" value={values.supplierType} onChange={handleInputChange}
                                    className="form-select" aria-label="Default select example">
                                <option disabled value=""> Select Supplier Type</option>
                                <option value="permanent">Permanent</option>
                                <option value="temporary">Temporary</option>
                            </select>
                        </div>
                        <div className="form-outline mb-4">
                            <label className="form-label">Supplier ID</label>
                            <input type="text" name="supplierId" placeholder="Supplier ID" value={values.supplierId}
                                   onChange={handleInputChange} className="form-control"/>
                        </div>

                        {/*<div className="form-outline mb-4">*/}
                        {/*    <label className="form-label">Quantity</label>*/}
                        {/*    <input type="text" name="quantity" placeholder="Quantity" value={values.quantity} onChange={handleInputChange} className="form-control" />*/}
                        {/*</div>*/}
                        {/*<div className="form-outline mb-4">*/}
                        {/*    <label className="form-label">Total Amount Paid</label>*/}
                        {/*    <input type="text" name="amountPaid" placeholder="Total Amount Paid" value={values.amountPaid} onChange={handleInputChange} className="form-control" />*/}
                        {/*</div>*/}

                        <Container fluid="md" className="table-responsive">
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>Category</th>
                                    <th>Quantity</th>
                                    <th>Payment</th>
                                </tr>
                                </thead>
                                <tbody className="text-center">
                                <tr>
                                    <td>PET</td>
                                    <td>
                                        <input type="text" name="quantity" placeholder="Quantity"
                                               value={values.quantity} onChange={handleInputChange}
                                               className="form-control"/>
                                    </td>
                                    <td>
                                        <input type="text" name="amountPaid" placeholder="Total Amount Paid"
                                               value={values.amountPaid} onChange={handleInputChange}
                                               className="form-control"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Other Plastic</td>
                                    <td>
                                        <input type="text" name="quantity" placeholder="Quantity"
                                               value={values.quantity} onChange={handleInputChange}
                                               className="form-control"/>
                                    </td>
                                    <td>
                                        <input type="text" name="amountPaid" placeholder="Total Amount Paid"
                                               value={values.amountPaid} onChange={handleInputChange}
                                               className="form-control"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Beer Cans</td>
                                    <td>
                                        <input type="text" name="quantity" placeholder="Quantity"
                                               value={values.quantity} onChange={handleInputChange}
                                               className="form-control"/>
                                    </td>
                                    <td>
                                        <input type="text" name="amountPaid" placeholder="Total Amount Paid"
                                               value={values.amountPaid} onChange={handleInputChange}
                                               className="form-control"/>
                                    </td>
                                </tr>
                                </tbody>
                            </Table>
                        </Container>

                        <div className="d-grid gap-3">
                            <button type="submit" className="btn btn-dark mt-3">Add Collection</button>
                            <div className="d-flex justify-content-center">
                                <button className="btn btn-outline-dark" onClick={() => navigate(-1)}>Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
