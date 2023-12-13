import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import CEANavBar from "./CEANavBar";
import {IoChevronBackSharp} from "react-icons/io5";
import Footer from "../Footer";

export default function AllMRFUsers() {
    const navigate = useNavigate();
    const [mrfUsers, setMRFUsers] = useState([]);
    const [showNav, setShowNav] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:8070/CEA/getAllMRFUsers`)
            .then((response) => {
                if (response.data.status === 'success') {
                    setMRFUsers(response.data.data);
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
            <CEANavBar showNav={showNav} setShowNav={setShowNav}/>
            <br/>

            <div className="row">
                <div className="col-2">
                    <button className="btn btn-dark mrf-btn" onClick={() => navigate(-1)}>
                        <IoChevronBackSharp/>
                    </button>
                </div>
                <div className="col-1"></div>
                <div className="col-6">
                    <h1 className="text-center mb-4">Material Recycling Facilities</h1>
                </div>
                <div className="col"></div>
            </div>

            <div className="table-responsive pb-5">
                <table className="table table-striped table-hover">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">District</th>
                        <th scope="col">Local Authority</th>
                        <th scope="col">Profile</th>
                    </tr>
                    </thead>
                    <tbody>
                    {mrfUsers.map((user, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.district}</td>
                            <td>{user.localAuthority}</td>
                            <td><Link to={`/cea-mrf-dashboard/${user.userId}`} className="btn btn-dark">Visit Profile</Link></td>
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
