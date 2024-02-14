import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import {Table, Container, Row, Col, Card} from "react-bootstrap";
import Footer from "../Footer";
import MRFNavBar from "./MRFNavBar";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function SupplierProfile() {
    const supplierId = useParams().supplierId;
    alert(supplierId);
    const [supplier, setSupplier] = useState({
        supplierName: '',
        userId: '',
        supplierId: '',
        supplierAddress: '',
        supplierContact: '',
        supplierEmail: '',
        supplierType: '',
    });

    useEffect(() => {
        const fetchSupplier = async () => {
            const response = await axios.get(`http://localhost:8070/MRF/getUserSupplier/${supplierId}`)
                .then((response) => {
                    if (response.data.status === 'success') {
                        console.log(response.data.data);
                        setSupplier(response.data.data);
                    } else {
                        console.error(response.data.message);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        };

        fetchSupplier();
    }, [supplierId]);

    const [collections, setCollections] = useState([]);

    useEffect(() => {
        const fetchCollections = async () => {
            const response = await axios.get(`http://localhost:8070/MRF/getSupplierCollections/${supplierId}`);
            setCollections(response.data.data);
        };

        fetchCollections();
    }, [supplierId]);

    const [showNav, setShowNav] = useState(false);

    return (
        <>
            <MRFNavBar showNav={showNav} setShowNav={setShowNav}/>
            <Container className="mt-5 pt-5">
                <Row>
                    <Col>
                        <h1 className="mb-4">Supplier Profile</h1>
                        <Card className="shadow-lg p-3 mb-5 bg-white rounded text-center">
                            <Card.Body>
                                <Card.Title><strong>{supplier.supplierName}</strong></Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">ID: {supplier.supplierId}</Card.Subtitle>
                                <Card.Text>
                                    <p className="my-2"><strong>Address:</strong> {supplier.supplierAddress}</p>
                                    <p className="my-2"><strong>Contact:</strong> {supplier.supplierContact}</p>
                                    <p className="my-2"><strong>Email:</strong> {supplier.supplierEmail}</p>
                                    <p className="my-2"><strong>Type:</strong> {supplier.supplierType}</p>
                                    <p className="my-2"><strong>Registered User:</strong> {supplier.userId}</p>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row className="mt-4">
                    <Col>
                        <h2 className="mb-3">Collections</h2>
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Quantity</th>
                                <th>Amount Paid (Rs.)</th>
                            </tr>
                            </thead>
                            <tbody className="text-center">
                            {collections.map(collection => {
                                const date = new Date(collection.createdAt);
                                const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
                                const formattedTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

                                return (
                                    <tr key={collection.supplierId}>
                                        <td>{formattedDate}</td>
                                        <td>{formattedTime}</td>
                                        <td>{collection.quantity}</td>
                                        <td>{collection.amountPaid}</td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </>
    );
}
