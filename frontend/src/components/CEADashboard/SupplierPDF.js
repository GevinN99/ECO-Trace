import logo from "../../assets/images/logo.png";
import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import {useReactToPrint} from "react-to-print";
import {useNavigate, useParams} from "react-router-dom";
import {Table} from "react-bootstrap";

export default function SupplierPDF() {
    const supplierId = useParams().supplierId;

    const [mrfDetails, setMrfDetails] = useState({});

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            axios.get(`http://localhost:8070/MRF/viewMRFProfile/${userId}`)
                .then((response) => {
                    if (response.data.status === 'success') {
                        setMrfDetails(response.data.data);
                    } else {
                        console.error(response.data.message);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, []);

    const componentRef = useRef();
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div className="wrapper p-3">
            <div className="row">
                <div className="col-12 mb-3 text-center">
                    <button className="btn btn-dark" onClick={handlePrint}>
                        Download as PDF
                    </button>
                    <button className="btn btn-dark ms-2" onClick={() => navigate('/SupplierCollection')}>
                        Back to Supplier Collection
                    </button>
                </div>
            </div>

            <div ref={componentRef} className="p-3 bg-light">
                {/* PDF Header */}
                <div className="pdf-header">
                    <div className="col  d-flex justify-content-center">
                        <h1 className="cea-title">Central Environmental Authority</h1>
                    </div>
                    <div className="col  d-flex justify-content-center">
                        <h3 className="cea-subtitle ">Plastic Collection Center</h3>
                    </div>
                    <div className="col d-flex justify-content-center">
                        <img src={logo} className="img-fluid" alt="Eco-Trace" style={{
                            width: '15%',
                            height: '5%'
                        }}/>
                    </div>
                </div>

                <hr/>

                <div className="row bg-light rounded">
                    <div className="col">
                        <div className="d-flex justify-content-center">
                            <h2>{mrfDetails.userName}</h2>
                        </div>
                        <div className="d-flex justify-content-center">
                            <h5 className="text-secondary">{mrfDetails.collectingLocationAddress}</h5>
                        </div>
                        <div className="d-flex justify-content-center">
                            <h5 className="text-secondary">{mrfDetails.telephone}</h5>
                        </div>
                    </div>
                </div>


                <hr/>

                <div>
                    <Table striped bordered hover className="text-center">
                        <thead>
                        <tr>
                            <th>No</th>
                            <th>Item Description</th>
                            <th>Qty</th>
                            <th>
                                <div className="row">
                                    <div className="col text-center">Rate</div>
                                </div>
                                <div className="row">
                                    <div className="col">Rs.</div>
                                    <div className="col">Cts.</div>
                                </div>
                            </th>
                            <th>
                                <div className="row">
                                    <div className="col text-center">
                                        <div className="col text-center">Amount</div>
                                    </div>
                                    <div className="row">
                                        <div className="col">Rs.</div>
                                        <div className="col">Cts.</div>
                                    </div>
                                </div>
                            </th>
                        </tr>
                        </thead>
                        <tbody className="text-center">
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <div className="row">
                                    <div className="col"></div>
                                    <div className="col"></div>
                                </div>
                            </td>
                            <td>
                                <div className="row">
                                    <div className="col"></div>
                                    <div className="col"></div>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </Table>
                </div>

                <div className="row text-center mt-5">
                    <div className="col text-center d-flex flex-column align-items-center mt-5">
                        <div>........................................................................................................</div>
                        <div>Checked By</div>
                    </div>
                    <div className="col text-center d-flex flex-column align-items-center mt-5">
                        <div>........................................................................................................</div>
                        <div>Customer Signature</div>
                        <div style={{fontSize:"small"}}>(Received the above mentioned Items in good condition)</div>
                    </div>
                </div>

            </div>
        </div>
    )
        ;
}