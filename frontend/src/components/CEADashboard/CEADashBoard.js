import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import moment from 'moment';
import Chart from "react-apexcharts";
import "./CEADashBoard.css";
import CEANavBar from "./CEANavBar";

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
            return {
                prevData: props.data,
                options: {
                    ...state.options,
                    xaxis: {
                        categories: props.data ? Object.keys(props.data).map(date => {
                            return moment(date, 'YYYY-MM-DD').format('DD-MM');
                        }) : []
                    }
                },
                series: props.data ? Object.entries(props.data).map(([name, data]) => ({
                    name,
                    data: Object.values(data)
                })) : []
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

export default function CEADashBoard() {
    const [auth, setAuth] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const [showNav, setShowNav] = useState(false);
    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get("http://localhost:8070/CEA/CEADashBoard").then((response) => {
            if (response.data.status === "success") {
                navigate("/CEADashboard");
            } else {
                setAuth(false);
                setMessage(response.data.message);
            }
        }).catch((error) => {
            console.error(error);
        });
    }, []);

    const [dailySums, setDailySums] = useState({
        PET: 0,
        HDPE: 0,
        LDPE: 0,
        PP: 0,
        PS: 0,
        PVC: 0
    });

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            axios.get(`http://localhost:8070/CEA/getSumLastDay/`)
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
        axios.get(`http://localhost:8070/CEA/getSumsLast7Days`)
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
    }, []);



    const [ceaProfile, setCeaProfile] = useState({});

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            axios.get(`http://localhost:8070/CEA/viewCEAProfile/${userId}`)
                .then((response) => {
                    if (response.data.status === 'success') {
                        setCeaProfile(response.data.data);
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
        axios.get(`http://localhost:8070/CEA/getSumsEachDayLastMonth`)
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
    }, []);

    return (
        <div className={`CEADashBoard ${auth ? "menuDisplayed" : ""}`}>
            <div id="wrapper">
                <div className="header-nav ">
                    <CEANavBar showNav={showNav} setShowNav={setShowNav} handleLogout={handleLogout}/>
                    {showNav ?
                        <div className="nav-links text-light">
                        <ul className=" bg-dark">
                            <li className=" bg-dark text-center text-light">
                                <span>{`User ID  : ${ceaProfile.userId}`}</span></li>
                            <li className=" bg-dark text-center text-light">
                                <span>{`User Name    : ${ceaProfile.userName}`}</span></li>
                            <li className=" bg-dark text-center text-light">
                                <span>{`First Name   : ${ceaProfile.firstName}`}</span></li>
                            <li className=" bg-dark text-center text-light">
                                <span>{`Last Name    : ${ceaProfile.lastName}`}</span></li>
                            <li className=" bg-dark text-center text-light">
                                <span>{`Address : ${ceaProfile.address}`}</span></li>
                            <li className=" bg-dark text-center text-light">
                                <span>{`Employee ID  : ${ceaProfile.employeeId}`}</span></li>
                            <li className=" bg-dark text-center text-light">
                                <span>{`Occupation   : ${ceaProfile.occupation}`}</span></li>
                        </ul>
                    </div>
                        : null }
                </div>
                <div className="cea-container">
                    <div className="row">
                        <div className="col-3"></div>
                        <div className="col-2">
                            <button className="btn btn-dark mrf-btn" onClick={() => navigate("/AllMRFUsers")}>
                                MRF Users
                            </button>
                        </div>
                        <div className="col-2"></div>
                        <div className="col-2">
                            <button className="btn btn-dark mrf-btn" onClick={() => navigate("/CEADashboard")}>
                                Generate Report
                            </button>
                        </div>
                        <div className="col-3"></div>
                    </div>

                    <br/>
                    <br/>

                    <div className="row">
                        <div className="col">
                            <table className="table caption-top table-hover">
                                <caption className="cea-container-table"> - Amounts Collected In a Day -</caption>
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
                            <div className="cea-graph-container d-flex justify-content-center align-items-center">- Amounts Collected In a Month -</div>
                            <div className="cea-graph-container d-flex justify-content-center align-items-center">
                                <div className="cea-graph">
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
                                <div className="cea-container-table">- Amounts Collected In a Month -</div>
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
