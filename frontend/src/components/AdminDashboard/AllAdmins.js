import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminNavBar from "./AdminNavBar";
import {IoChevronBackSharp} from "react-icons/io5";
import Footer from "../Footer";

export default function AllAdmins() {
    const navigate = useNavigate();
    const [admins, setAdmins] = useState([]);
    const [showNav, setShowNav] = useState(false);
    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get(`http://localhost:8070/Admin/getAllAdmins`)
            .then((response) => {
                if (response.data.status === 'success') {
                    setAdmins(response.data.data);
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
        <div>
        <div className="container pt-5">
            <br/>
            <AdminNavBar/>
            <br/>
            <div className="row">
                <div className="col-2">
                    <button className="btn btn-dark admin-btn" onClick={() => navigate(-1)}><IoChevronBackSharp/></button>
                </div>
                <div className="col-1"></div>
                <div className="col-6">
                    <h1 className="text-center mb-4">Admins</h1>
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
                        <th scope="col">Update</th>
                    </tr>
                    </thead>
                    <tbody>
                    {admins.map((admin, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{admin.firstName}</td>
                            <td>{admin.lastName}</td>
                            <td>{admin.userName}</td>
                            <td><Link to={`/admin-dashboard/${admin.userId}`} className="btn btn-dark">Update</Link></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
            <Footer/>
        </div>
    );
}
