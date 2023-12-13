import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminNavBar from "./AdminNavBar";
import {IoChevronBackSharp} from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import Footer from "../Footer";

export default function AllCEAs() {
    const navigate = useNavigate();
    const [CEAs, setCEAs] = useState([]);
    const [showNav, setShowNav] = useState(false);
    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get(`http://localhost:8070/Admin/getAllCEAs`)
            .then((response) => {
                if (response.data.status === 'success') {
                    setCEAs(response.data.data);
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
        <div className="container pt-5 pb-5">
            <AdminNavBar/>
            <div className="row p-5">
                <div className="col-2">
                    <button className="btn btn-dark admin-btn" onClick={() => navigate(-1)}><IoChevronBackSharp/></button>
                </div>
                <div className="col-1"></div>
                <div className="col-6">
                    <h1 className="text-center mb-4">Central Environment Authority Accounts</h1>
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
                    {CEAs.map((CEA, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{CEA.firstName}</td>
                            <td>{CEA.lastName}</td>
                            <td>{CEA.userName}</td>
                            <td><Link to={`/CEAProfile/${CEA.userId}`} className="btn btn-dark">Update</Link></td>
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
