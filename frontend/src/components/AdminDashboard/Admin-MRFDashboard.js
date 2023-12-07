import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import moment from 'moment';
import Chart from "react-apexcharts";
import "../MRFDashboard/MRFDashBoard.css";
import AdminNavBar from "./AdminNavBar";
import {IoChevronBackSharp} from "react-icons/io5";

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
                        <Chart options={this.state.options} series={this.state.series} type="line" width="500"/>
                    </div>
                </div>
            </div>
        );
    }
}


export default function AdminMRFDashboard() {
    const navigate = useNavigate();
    const userId = useParams().userId;
    axios.defaults.withCredentials = true;

    const [dailySums, setDailySums] = useState({PET: 0, HDPE: 0, LDPE: 0, PP: 0, PS: 0, PVC: 0});

    useEffect(() => {
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

    const transformedData = Object.entries(sumsLast7Days).reduce((acc, [date, categories]) => {
        Object.entries(categories).forEach(([category, sum]) => {
            if (!acc[category]) {
                acc[category] = {};
            }
            acc[category][date] = sum;
        });
        return acc;
    }, {});

    const [sumsEachDayLastMonth, setSumsEachDayLastMonth] = useState({});

    useEffect(() => {
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
        <div className="p-5">
            <div id="wrapper">
                <AdminNavBar/>
                <div className="mrf-container p-3">
                    <div className="row">
                        <div className="col-2">
                            <button className="btn btn-dark admin-btn" onClick={() => navigate(-1)}><IoChevronBackSharp/></button>
                        </div>
                        <div className="col-1"></div>
                        <div className="col-6">
                            <h1 className="text-center mb-4 fw-bold">MRF Dashboard</h1>
                        </div>
                        <div className="col"></div>
                    </div>
                    <div className="row d-flex justify-content-center align-content-center">
                            <Link to={`/getUserSuppliers/${userId}`} className="btn btn-dark mrf-btn col-1">Suppliers</Link>
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
                                    <LineChart data={transformedData}/>
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
