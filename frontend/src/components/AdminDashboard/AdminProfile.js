import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import {IoChevronBackSharp, IoTrashBinSharp} from "react-icons/io5";
import AdminNavBar from "./AdminNavBar";
import Footer from "../Footer";

export default function AdminDashboard() {
    const {userId} = useParams();
    console.log("useParams() :" + userId);
    const navigate = useNavigate();
    const [admin, setAdmin] = useState({firstName: '', lastName: '', userName: '', password: ''});
    const [passwordVisible, setPasswordVisible] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:8070/Admin/getAdmin/${userId}`)
            .then((response) => {
                if (response.data.status === 'success') {
                    setAdmin(response.data.data);
                } else {
                    console.error(response.data.message);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, [userId]);

    const updateAdmin = () => {
        axios.put(`http://localhost:8070/auth/updateAdmin/${userId}`, admin)
            .then((response) => {
                if (response.data.status === 'success') {
                    alert('Admin updated successfully');
                } else {
                    console.error(response.data.message);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const currentAdminId = localStorage.getItem('userId');

    const deleteAdmin = () => {
        axios.delete(`http://localhost:8070/Admin/deleteAdmin/${userId}`)
            .then((response) => {
                if (response.data.status === 'success') {
                    alert('Admin deleted successfully');
                    if (userId === currentAdminId) {
                        axios.get("http://localhost:8070/auth/logout").then((response) => {
                            if (response.data.status === "success") {
                                navigate('/login');
                            } else {
                                console.error(response.data.message);
                            }
                        }).catch((error) => {
                            console.error(error);
                        });
                    } else {
                        navigate('/allAdmins');
                    }
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
                        <h1 className="text-center">Admin Profile</h1>
                        <div></div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="firstName" className="form-label">First Name</label>
                                    <input type="text" className="form-control" id="firstName" value={admin.firstName}
                                           onChange={(e) => setAdmin({...admin, firstName: e.target.value})}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="lastName" className="form-label">Last Name</label>
                                    <input type="text" className="form-control" id="lastName" value={admin.lastName}
                                           onChange={(e) => setAdmin({...admin, lastName: e.target.value})}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="userName" className="form-label">Username</label>
                                    <input type="text" className="form-control" id="userName" value={admin.userName}
                                           onChange={(e) => setAdmin({...admin, userName: e.target.value})}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password"
                                           onChange={(e) => setAdmin({...admin, password: e.target.value})}/>
                                </div>
                                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <button className="btn btn-dark me-md-2" type="button" onClick={updateAdmin}>Update</button>
                                    <button className="btn btn-outline-danger" type="button" onClick={deleteAdmin}><IoTrashBinSharp/></button>
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
