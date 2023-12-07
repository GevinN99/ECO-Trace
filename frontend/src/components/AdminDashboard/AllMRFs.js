import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminNavBar from "./AdminNavBar";
import {IoChevronBackSharp} from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

export default function AllMRFs() {
    const navigate = useNavigate();
    const [MRFs, setMRFs] = useState([]);
    const [showNav, setShowNav] = useState(false);
    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get(`http://localhost:8070/Admin/getAllMRFs`)
            .then((response) => {
                if (response.data.status === 'success') {
                    setMRFs(response.data.data);
                    console.log(response.data.data);
                } else {
                    console.error(response.data.message);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div className="container pt-5">
            <AdminNavBar/>
            <div className="row p-5">
                <div className="col-2">
                    <button className="btn btn-dark admin-btn" onClick={() => navigate(-1)}><IoChevronBackSharp/></button>
                </div>
                <div className="col-1"></div>
                <div className="col-6">
                    <h1 className="text-center mb-4">MRF Accounts</h1>
                </div>
                <div className="col"></div>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-hover">
                    <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Username</th>
                        <th scope="col">District</th>
                        <th scope="col">Profile</th>
                        <th scope="col">Dashboard</th>
                    </tr>
                    </thead>
                    <tbody>
                    {MRFs.map((MRF, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{MRF.firstName}</td>
                            <td>{MRF.lastName}</td>
                            <td>{MRF.userName}</td>
                            <td>{MRF.district}</td>
                            <td><Link to={`/MRFProfile/${MRF.userId}`} className="btn btn-dark"><CgProfile /></Link></td>
                            <td><Link to={`/AdminMRFDashboard/${MRF.userId}`} className="btn btn-dark">Visit</Link></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
