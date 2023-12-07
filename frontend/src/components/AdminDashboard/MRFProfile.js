import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import {IoChevronBackSharp, IoTrashBinSharp} from "react-icons/io5";
import AdminNavBar from "./AdminNavBar";

export default function MRFProfile() {
    const {userId} = useParams();
    const navigate = useNavigate();
    const [mrf, setMRF] = useState({
        firstName: '',
        lastName: '',
        district: '',
        localAuthority: '',
        idOrPassportNumber: '',
        collectingLocationAddress: '',
        telephone: '',
        gpsLocation: '',
        userName: '',
        userId: '',
        password: ''
    });

    useEffect(() => {
        axios.get(`http://localhost:8070/Admin/getMRF/${userId}`)
            .then((response) => {
                if (response.data.status === 'success') {
                    setMRF(response.data.data);
                } else {
                    console.error(response.data.message);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }, [userId]);

    const updateMRF = () => {
        axios.put(`http://localhost:8070/auth/updateMRF/${userId}`, mrf)
            .then((response) => {
                if (response.data.status === 'success') {
                    alert('MRF updated successfully');
                } else {
                    console.error(response.data.message);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const currentMRFId = localStorage.getItem('userId');

    const deleteMRF = () => {
        axios.delete(`http://localhost:8070/Admin/deleteMRF/${userId}`)
            .then((response) => {
                if (response.data.status === 'success') {
                    alert('MRF deleted successfully');
                    navigate('/allMRFs');
                } else {
                    console.error(response.data.message);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div className="container py-5">
            <AdminNavBar/>
            <div className="row justify-content-center p-5">
                <div className="col-12 col-md-8">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <button className="btn btn-dark admin-btn" onClick={() => navigate(-1)}><IoChevronBackSharp/>
                        </button>
                        <h1 className="text-center">MRF Profile</h1>
                        <div></div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="firstName" className="form-label">First Name</label>
                                    <input type="text" className="form-control" id="firstName" value={mrf.firstName}
                                           onChange={(e) => setMRF({...mrf, firstName: e.target.value})}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="lastName" className="form-label">Last Name</label>
                                    <input type="text" className="form-control" id="lastName" value={mrf.lastName}
                                           onChange={(e) => setMRF({...mrf, lastName: e.target.value})}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="district" className="form-label">District</label>
                                    <input type="text" className="form-control" id="district" value={mrf.district}
                                           onChange={(e) => setMRF({...mrf, district: e.target.value})}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="localAuthority" className="form-label">Local Authority</label>
                                    <input type="text" className="form-control" id="localAuthority"
                                           value={mrf.localAuthority}
                                           onChange={(e) => setMRF({...mrf, localAuthority: e.target.value})}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="idOrPassportNumber" className="form-label">ID or Passport
                                        Number</label>
                                    <input type="text" className="form-control" id="idOrPassportNumber"
                                           value={mrf.idOrPassportNumber}
                                           onChange={(e) => setMRF({...mrf, idOrPassportNumber: e.target.value})}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="collectingLocationAddress" className="form-label">Collecting
                                        Location Address</label>
                                    <input type="text" className="form-control" id="collectingLocationAddress"
                                           value={mrf.collectingLocationAddress} onChange={(e) => setMRF({
                                        ...mrf,
                                        collectingLocationAddress: e.target.value
                                    })}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="telephone" className="form-label">Telephone</label>
                                    <input type="text" className="form-control" id="telephone" value={mrf.telephone}
                                           onChange={(e) => setMRF({...mrf, telephone: e.target.value})}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="gpsLocation" className="form-label">GPS Location</label>
                                    <input type="text" className="form-control" id="gpsLocation" value={mrf.gpsLocation}
                                           onChange={(e) => setMRF({...mrf, gpsLocation: e.target.value})}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="userName" className="form-label">Username</label>
                                    <input type="text" className="form-control" id="userName" value={mrf.userName}
                                           onChange={(e) => setMRF({...mrf, userName: e.target.value})}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password"
                                           onChange={(e) => setMRF({...mrf, password: e.target.value})}/>
                                </div>
                                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <button className="btn btn-dark me-md-2" type="button" onClick={updateMRF}>Update
                                    </button>
                                    <button className="btn btn-outline-danger" type="button" onClick={deleteMRF}>
                                        <IoTrashBinSharp/></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
