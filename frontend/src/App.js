import React from "react";
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import WelcomePage from "./components/WelcomePage";
import CreateAdminPage from "./components/CreateAdminPage";
import CreateMRFPage from "./components/CreateMRFPage";
import CreateCEAPage from "./components/CreateCEAPage";
import AdminDashBoard from "./components/AdminDashBoard";
import MRFDashBoard from "./components/MRFDashBoard";
import CEADashBoard from "./components/CEADashBoard";
import SupplierCollection from "./components/SupplierCollection";
import CreateSupplier from "./components/CreateSupplier";
import SupplierPage from "./components/SupplierPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/createadmin" element={<CreateAdminPage/>}/>
                <Route path="/home" element={<HomePage/>}/>
                <Route path="/" element={<WelcomePage/>}/>
                <Route path="/createmrf" element={<CreateMRFPage/>}/>
                <Route path="/createcea" element={<CreateCEAPage/>}/>
                <Route path="/AdminDashboard" element={<AdminDashBoard/>}/>
                <Route path="/CEADashboard" element={<CEADashBoard/>}/>
                <Route path="/MRFDashBoard" element={<MRFDashBoard/>}/>
                <Route path="/SupplierCollection" element={<SupplierCollection/>}/>
                <Route path="/CreateSupplier" element={<CreateSupplier/>}/>
                <Route path="/ViewAllSuppliers" element={<SupplierPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
