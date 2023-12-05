import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import moment from 'moment';
import Chart from "react-apexcharts";
import "./MRFDashBoard.css";
import MRFNavBar from "./MRFNavBar";

class LineChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: {
                chart: {
                    id: "line"
                },
                xaxis: {
                    categories: []
                },
            },
            series: []
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (props.data !== state.prevData) {
            const firstCategoryData = Object.values(props.data)[0] || {};
            const dates = Object.keys(firstCategoryData);
            return {
                prevData: props.data,
                options: {
                    ...state.options,
                    xaxis: {
                        categories: dates.map(date => date.substring(5, 10))
                    }
                },
                series: props.data ? Object.entries(props.data).map(([name, data]) => ({ name, data: Object.values(data) })) : []
            };
        }
        return null;
    }


    render() {
        return (
            <div className="LineChart">
                <div className="row">
                    <div className="mixed-chart">
                        <Chart options={this.state.options} series={this.state.series} type="line" width="500" />
                    </div>
                </div>
            </div>
        );
    }
}



export default function MRFDashBoard() {
    const [auth, setAuth] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const [showNav, setShowNav] = useState(false);
    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get("http://localhost:8070/MRF/MRFDashBoard").then((response) => {
            if (response.data.status === "success") {
                navigate("/MRFDashboard");
            } else {
                setAuth(false);
                setMessage(response.data.message);
            }
        }).catch((error) => {
            console.error(error);
        });
    }, []);

    const [dailySums, setDailySums] = useState({ PET: 0, HDPE: 0, LDPE: 0, PP: 0, PS: 0, PVC: 0 });

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            axios.get(`http://localhost:8070/MRF/getSumLastDay/${userId}`)
                .then((response) => {
                    if (response.data.status === 'success') {
                        setDailySums(response.data.data);
                    } else {
                        console.error(response.data.message);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, []);

    const [sumsLast7Days, setSumsLast7Days] = useState({});

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            axios.get(`http://localhost:8070/MRF/getSumsLast7Days/${userId}`)
                .then((response) => {
                    if (response.data.status === 'success') {
                        setSumsLast7Days(response.data.data);
                    } else {
                        console.error(response.data.message);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, []);

    const [mrfProfile, setMrfProfile] = useState({});

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            axios.get(`http://localhost:8070/MRF/viewMRFProfile/${userId}`)
                .then((response) => {
                    if (response.data.status === 'success') {
                        setMrfProfile(response.data.data);
                    } else {
                        console.error(response.data.message);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, []);

    // Transform the data
    const transformedData = Object.entries(sumsLast7Days).reduce((acc, [date, categories]) => {
        Object.entries(categories).forEach(([category, sum]) => {
            if (!acc[category]) {
                acc[category] = {};
            }
            acc[category][date] = sum;
        });
        return acc;
    }, {});

    const handleLogout = () => {
        axios.get("http://localhost:8070/auth/logout").then((response) => {
            if (response.data.status === "success") {
                setAuth(false);
                navigate("/login");
            } else {
                console.error(response.data.message);
            }
        }).catch((error) => {
            console.error(error);
        });
    };

    const [sumsEachDayLastMonth, setSumsEachDayLastMonth] = useState({});

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            axios.get(`http://localhost:8070/MRF/getSumsEachDayLastMonth/${userId}`)
                .then((response) => {
                    if (response.data.status === 'success') {
                        setSumsEachDayLastMonth(response.data.data);
                    } else {
                        console.error(response.data.message);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, []);



    return (
        <div className={`MRFDashBoard ${auth ? "menuDisplayed" : ""}`}>
            <div id="wrapper">
                <div className="header-nav ">
                    <MRFNavBar showNav={showNav} setShowNav={setShowNav} handleLogout={handleLogout}/>
                    {showNav && (
                        <div className={`bg-dark text-light p-5 position-fixed h-100 sidebar ${showNav ? 'show' : ''}`} style={{width: '300px'}}>
                            <ul className="list-unstyled">
                                <li className="text-center">User ID: {mrfProfile.userId}</li>
                                <li className="text-center">User Name: {mrfProfile.userName}</li>
                                <li className="text-center">First Name: {mrfProfile.firstName}</li>
                                <li className="text-center">Last Name: {mrfProfile.lastName}</li>
                                <li className="text-center">District: {mrfProfile.district}</li>
                                <li className="text-center">Local Authority: {mrfProfile.localAuthority}</li>
                                <li className="text-center">Id/Passport Number: {mrfProfile.idOrPassportNumber}</li>
                                <li className="text-center">Collecting Location Address: {mrfProfile.collectingLocationAddress}</li>
                                <li className="text-center">Telephone: {mrfProfile.telephone}</li>
                                <li className="text-center">GPS Location: {mrfProfile.gpsLocation}</li>
                            </ul>
                        </div>
                    )}
                </div>

                <div className="mrf-container">


                    <div className="row">
                        <div className="col-3"></div>
                        <div className="col-2">
                            <button className="btn btn-dark mrf-btn" onClick={() => navigate("/CreateSupplier")}>
                                Add New Supplier
                            </button>
                        </div>
                        <div className="col-2"></div>
                        <div className="col-2">
                            <button className="btn btn-dark mrf-btn" onClick={() => navigate("/ViewAllSuppliers")}>
                                View ALl Suppliers
                            </button>
                        </div>
                        <div className="col-3"></div>
                    </div>

                    <br/>
                    <br/>

                    <div className="row">
                        <div className="col">
                            <table className="table caption-top table-hover">
                                <caption className="mrf-container-table"> - Amounts Collected In a Day -</caption>
                                <thead>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col">Type of Plastic</th>
                                    <th scope="col">Quantity (Kg)</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Polyethylene terephthalate (PET)</td>
                                    <td>{dailySums.PET}</td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>High-density polyethylene (HDPE)</td>
                                    <td>{dailySums.HDPE}</td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>Low-density polyethylene (LDPE)</td>
                                    <td>{dailySums.LDPE}</td>
                                </tr>
                                <tr>
                                    <th scope="row">4</th>
                                    <td>Polypropylene (PP)</td>
                                    <td>{dailySums.PP}</td>
                                </tr>
                                <tr>
                                    <th scope="row">5</th>
                                    <td>Polystyrene (PS)</td>
                                    <td>{dailySums.PS}</td>
                                </tr>
                                <tr>
                                    <th scope="row">6</th>
                                    <td>Polyvinyl chloride (PVC)</td>
                                    <td>{dailySums.PVC}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        {/*Line Graph*/}
                        <div className="col">
                            <div className="mrf-graph-container d-flex justify-content-center align-items-center">-
                                Amounts Collected In a Month -
                            </div>
                            <div className="mrf-graph-container d-flex justify-content-center align-items-center">
                                <div className="mrf-graph">
                                    <LineChart data={transformedData} />
                                </div>
                            </div>
                        </div>

                    </div>

                    <br/>
                    <br/>

                    <div className="row">
                        <div className="col">
                            <div className="col-md-12">
                                <div className="mrf-container-table">- Amounts Collected In a Month -</div>
                            </div>
                            <br/>
                            <table className="table table-striped table-hover">
                                <thead>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col">Date</th>
                                    <th scope="col">PET (Kg)</th>
                                    <th scope="col">HDPE (Kg)</th>
                                    <th scope="col">LDPE (Kg)</th>
                                    <th scope="col">PP (Kg)</th>
                                    <th scope="col">PS (Kg)</th>
                                    <th scope="col">PVC (Kg)</th>
                                </tr>
                                </thead>
                                <tbody>
                                {Object.entries(sumsEachDayLastMonth).map(([date, sums], index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{moment(date, 'YYYY-MM-DD').format('DD-MM')}</td>
                                        <td>{sums.PET}</td>
                                        <td>{sums.HDPE}</td>
                                        <td>{sums.LDPE}</td>
                                        <td>{sums.PP}</td>
                                        <td>{sums.PS}</td>
                                        <td>{sums.PVC}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
