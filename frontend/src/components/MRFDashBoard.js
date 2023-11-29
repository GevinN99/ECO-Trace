import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Chart from "react-apexcharts";
import {CgProfile} from "react-icons/cg";
import {FaHome} from "react-icons/fa";
import "./CSS/MRFPage.css";

class LineChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            options: {
                chart: {
                    id: "line"
                },
                xaxis: {
                    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
                },
            },
            series: [
                {
                    name: "PET",
                    data: [30, 60, 45, 20, 49, 60, 70, 91]
                },
                {
                    name: "HDPE",
                    data: [40, 70, 75, 50, 49, 60, 70, 91]
                },
                {
                    name: "LDPE",
                    data: [50, 50, 35, 20, 49, 60, 70, 91]
                },
                {
                    name: "PP",
                    data: [60, 40, 65, 70, 49, 60, 70, 91]
                },
                {
                    name: "PS",
                    data: [70, 30, 15, 20, 49, 60, 70, 91]
                },
                {
                    name: "PVC",
                    data: [80, 40, 45, 50, 49, 60, 70, 91]
                }
            ]
        };
    }

    render() {
        return (
            <div className="LineChart">
                <div className="row">
                    <div className="mixed-chart">
                        <Chart
                            options={this.state.options}
                            series={this.state.series}
                            type="line"
                            width="500"
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default function MRFDashBoard() {
    const [auth, setAuth] = useState(false);
    const [message, setMessage] = useState("");
    const [userId, setUserId] = useState("");
    const navigate = useNavigate();
    const [showNav, setShowNav] = useState(false);

    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get("http://localhost:8070/MRF/MRFDashBoard").then((response) => {
            if (response.data.status === "success") {
                setAuth(true);
                setUserId(response.data.userId);
                navigate("/MRFDashboard");
            } else {
                setAuth(false);
                setMessage(response.data.message);
            }
        }).catch((error) => {
            console.error(error);
        });
    }, []);

    const handleLogout = () => {
        axios.get("http://localhost:8070/auth/logout").then((response) => {
            if (response.data.status === "success") {
                setAuth(false);
                setUserId("");
                navigate("/login");
            } else {
                console.error(response.data.message);
            }
        }).catch((error) => {
            console.error(error);
        });
    };

    return (
        <div className={`MRFDashBoard ${auth ? "menuDisplayed" : ""}`}>
            <div id="wrapper">
                <div className="header-nav ">
                    <div className="row ">
                        <div className='col-1 '>
                            <div className="mrf-nav-logo ">
                                <CgProfile onClick={() => setShowNav(!showNav)}/>
                            </div>
                        </div>

                        <div className="col-1">
                            <div className="mrf-nav-logo" onClick={() => navigate("/MRFDashBoard")}>
                                <FaHome/>
                            </div>
                        </div>

                        <div className="col-6 "></div>

                        <div className="col-1 ">
                            <button className="header-nav-btn btn btn-outline-light"
                                    onClick={() => navigate("/SupplierCollection")}>
                                Collected
                            </button>
                        </div>

                        <div className="col-1 ">
                            <button className="header-nav-btn btn btn-outline-light " onClick={() => navigate("/")}>
                                Categorized
                            </button>
                        </div>

                        <div className="col-1"></div>

                        <div className="col-1 ">
                            <button className="header-nav-btn btn btn-outline-danger "
                                    onClick={handleLogout}>Logout
                            </button>
                        </div>
                    </div>

                    {showNav ?
                        <div className="nav-links">
                            <ul>
                                <li>
                                    <a href='/'>Home</a>
                                </li>
                                <li>
                                    <a href='/'>About</a>
                                </li>
                                <li>
                                    <a href='/'>Pages</a>
                                </li>
                            </ul>
                        </div>
                        :
                        null
                    }
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
                                    <td>01</td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>High-density polyethylene (HDPE)</td>
                                    <td>01</td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>Low-density polyethylene (LDPE)</td>
                                    <td>01</td>
                                </tr>
                                <tr>
                                    <th scope="row">4</th>
                                    <td>Polypropylene (PP)</td>
                                    <td>01</td>
                                </tr>
                                <tr>
                                    <th scope="row">5</th>
                                    <td>Polystyrene (PS)</td>
                                    <td>01</td>
                                </tr>
                                <tr>
                                    <th scope="row">6</th>
                                    <td>Polyvinyl chloride (PVC)</td>
                                    <td>01</td>
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
                                    <LineChart/>
                                </div>
                            </div>
                        </div>

                    </div>

                    <br/>
                    <br/>

                    <div className="row">
                        <div className="col">
                            <div className="col-md-12">
                                <div className="mrf-container-table"> - Amounts Collected In a Month -</div>
                            </div>
                            <br/>
                            <table className="table table-striped table-hover">
                                <thead>
                                <tr>
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
                                <tr>
                                    <th scope="row">1</th>
                                    <td>01</td>
                                    <td>01</td>
                                    <td>01</td>
                                    <td>01</td>
                                    <td>01</td>
                                    <td>01</td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>01</td>
                                    <td>01</td>
                                    <td>01</td>
                                    <td>01</td>
                                    <td>01</td>
                                    <td>01</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
