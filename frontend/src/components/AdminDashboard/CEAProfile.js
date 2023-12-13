import React, {useEffect, useState} from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import {IoChevronBackSharp, IoTrashBinSharp} from "react-icons/io5";
import {useNavigate, useParams} from "react-router-dom";
import AdminNavBar from "./AdminNavBar";
import Footer from "../Footer";

export default function CEAProfile() {
    const navigate = useNavigate();
    const {userId} = useParams();
    const [cea, setCEA] = useState({firstName: '', lastName: '', userName: '', password: '', address: '', employeeId: '', occupation: ''});

    useEffect(() => {
        axios.get(`http://localhost:8070/Admin/getCEA/${userId}`)
            .then((response) => {
                if (response.data.status === 'success') {
                    setCEA(response.data.data);
                } else {
                    console.error(response.data.message);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, [userId]);

    const updateCEA = () => {
        axios.put(`http://localhost:8070/auth/updateCEA/${userId}`, cea)
            .then((response) => {
                if (response.data.status === 'success') {
                    alert('CEA updated successfully');
                } else {
                    console.error(response.data.message);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const deleteCEA = () => {
        axios.delete(`http://localhost:8070/Admin/deleteCEA/${userId}`)
            .then((response) => {
                if (response.data.status === 'success') {
                    alert('CEA deleted successfully');
                    navigate('/allCEAs');
                } else {
                    console.error(response.data.message);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div>
        <div className="container py-5">
            <AdminNavBar/>
            <div className="row justify-content-center p-5">
                <div className="col-12 col-md-8">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <button className="btn btn-dark admin-btn" onClick={() => navigate(-1)}><IoChevronBackSharp/></button>
                        <h1 className="text-center">CEA's Profile</h1>
                        <div></div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="firstName" className="form-label">First Name</label>
                                    <input type="text" className="form-control" id="firstName" value={cea.firstName} onChange={(e) => setCEA({...cea, firstName: e.target.value})}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="lastName" className="form-label">Last Name</label>
                                    <input type="text" className="form-control" id="lastName" value={cea.lastName} onChange={(e) => setCEA({...cea, lastName: e.target.value})}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="userName" className="form-label">Username</label>
                                    <input type="text" className="form-control" id="userName" value={cea.userName} onChange={(e) => setCEA({...cea, userName: e.target.value})}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="address" className="form-label">Address</label>
                                    <input type="text" className="form-control" id="address" value={cea.address} onChange={(e) => setCEA({...cea, address: e.target.value})}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="employeeId" className="form-label">Employee ID</label>
                                    <input type="text" className="form-control" id="employeeId" value={cea.employeeId} onChange={(e) => setCEA({...cea, employeeId: e.target.value})}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="occupation" className="form-label">Occupation</label>
                                    <input type="text" className="form-control" id="occupation" value={cea.occupation} onChange={(e) => setCEA({...cea, occupation: e.target.value})}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" onChange={(e) => setCEA({...cea, password: e.target.value})}/>
                                </div>
                                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <button className="btn btn-dark me-md-2" type="button" onClick={updateCEA}>Update</button>
                                    <button className="btn btn-outline-danger" type="button" onClick={deleteCEA}><IoTrashBinSharp/></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
    );
}
