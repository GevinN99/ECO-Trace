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
import MRFDashBoard from "./components/MRFDashboard/MRFDashBoard";
import CEADashBoard from "./components/CEADashboard/CEADashBoard";
import SupplierCollection from "./components/MRFDashboard/SupplierCollection";
import CreateSupplier from "./components/MRFDashboard/CreateSupplier";
import SupplierPage from "./components/MRFDashboard/SupplierPage";
import CategoryCreation from "./components/MRFDashboard/AddCategorizedData";
import MRFNavBar from "./components/MRFDashboard/MRFNavBar";
import CEANavBar from "./components/CEADashboard/CEANavBar";
import AllMRFUsers from "./components/CEADashboard/AllMRFUsers";
import CEAMRFDashBoard from "./components/CEADashboard/CEA-MRFDashBoard";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/home" element={<HomePage/>}/>
                <Route path="/" element={<WelcomePage/>}/>

                {/*  Admin Dashboard  */}
                <Route path="/AdminDashboard" element={<AdminDashBoard/>}/>
                <Route path="/createadmin" element={<CreateAdminPage/>}/>
                <Route path="/createmrf" element={<CreateMRFPage/>}/>
                <Route path="/createcea" element={<CreateCEAPage/>}/>

                {/*  MRF Dashboard  */}
                <Route path="/MRFDashBoard" element={<MRFDashBoard/>}/>
                <Route path="/SupplierCollection" element={<SupplierCollection/>}/>
                <Route path="/CreateSupplier" element={<CreateSupplier/>}/>
                <Route path="/ViewAllSuppliers" element={<SupplierPage/>}/>
                <Route path="/AddCategorizedData" element={<CategoryCreation/>}/>
                <Route path="/MRFNavBar" element={<MRFNavBar/>}/>

                {/*  CEA Dashboard  */}
                <Route path="/CEADashboard" element={<CEADashBoard/>}/>
                <Route path="/CEANavBar" element={<CEANavBar/>}/>
                <Route path="/AllMRFUsers" element={<AllMRFUsers/>}/>
                <Route path="/AllMRFUsers" element={<AllMRFUsers/>}/>
                <Route path="/cea-mrf-dashboard/:userId" element={<CEAMRFDashBoard />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;
