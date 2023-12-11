import React from 'react';
import {SiFacebook} from "react-icons/si";
import {Link} from "react-router-dom";
import {IoLogoYoutube} from "react-icons/io";
import logo from "../assets/images/logo.png";

export default function Footer() {
    return (
        <footer className="bg-dark text-light py-5">
            <div className="container">
                <div className="row justify-content-between">
                    <div className="col-lg-3 col-md-6 mb-4">
                        <h4 className="text-uppercase text-white mb-4">Central Environment Authority</h4>
                        <p className="text-white-50">The Ministry of Environment and Natural Resources (ME&NR) which was
                            established in December 2001 has the overall responsibility in the affairs of the CEA with
                            the objective of integrating environmental considerations in the development process of the
                            country.</p>
                        <div className="mt-2">
                            <Link to="https://www.facebook.com/CEASriLanka/"><SiFacebook/></Link> &nbsp;
                            <Link to="https://www.youtube.com/@centralenvironmentalauthor3017"><IoLogoYoutube/></Link>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-4">
                        <h4 className="text-uppercase text-white mb-4">Contact Admin</h4>
                        <ul className="list-unstyled text-white-50">
                            <li><i className="fas fa-phone me-2"></i>(+00) 0000 000 000</li>
                            <li><i className="fas fa-envelope me-2"></i>office@company.com</li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-4">
                        <h4 className="text-uppercase text-white mb-4">Eco-Trace</h4>
                        <img src={logo} className="img-fluid" alt="Eco-Trace"/>
                    </div>
                </div>
            </div>
            <div className="text-end text-white-50 pe-4 pb-2">
                Developed by: GSK<br/>
                Email: gevinnanayakkara@gmail.com
            </div>
            <div className="text-center bg-secondary text-white-50 py-3">
                ©{new Date().getFullYear()} Eco-Trace - All Rights Reserved
            </div>
        </footer>
    );
}
