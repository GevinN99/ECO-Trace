import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {PrivateRouteAdmin, PrivateRouteCEA, PrivateRouteMRF} from './utils/PrivateRoute';
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import WelcomePage from "./components/WelcomePage";
import CreateAdminPage from "./components/AdminDashboard/CreateAdminPage";
import CreateMRFPage from "./components/AdminDashboard/CreateMRFPage";
import CreateCEAPage from "./components/AdminDashboard/CreateCEAPage";
import AdminDashBoard from "./components/AdminDashboard/AdminDashBoard";
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
import CEASupplierPage from "./components/CEADashboard/CEA-SupplierPage";
import AdminNavBar from "./components/AdminDashboard/AdminNavBar";
import AllAdmins from "./components/AdminDashboard/AllAdmins";
import AdminProfile from "./components/AdminDashboard/AdminProfile";
import AdminCEADashBoard from "./components/AdminDashboard/Admin-CEADashboard";
import AllCEAs from "./components/AdminDashboard/AllCEAs";
import CEAProfile from "./components/AdminDashboard/CEAProfile";
import AllMRFs from "./components/AdminDashboard/AllMRFs";
import MRFProfile from "./components/AdminDashboard/MRFProfile";
import AdminMRFDashboard from "./components/AdminDashboard/Admin-MRFDashboard";
import AdminSupplierPage from "./components/AdminDashboard/Admin-SupplierPage";
import Footer from "./components/Footer";
import CEAPDF from "./components/CEADashboard/CEAPDF";


function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/*  Admin Dashboard  */}
                <Route element={<PrivateRouteAdmin/>}>
                    <Route path="/AdminDashboard" element={<AdminDashBoard/>}/>
                    <Route path="/createadmin" element={<CreateAdminPage/>}/>
                    <Route path="/createmrf" element={<CreateMRFPage/>}/>
                    <Route path="/createcea" element={<CreateCEAPage/>}/>
                    <Route path="/AdminNavBar" element={<AdminNavBar/>}/>
                    <Route path="/allAdmins" element={<AllAdmins/>}/>
                    <Route path="/admin-dashboard/:userId" element={<AdminProfile/>}/>
                    <Route path="/AdminCEADashBoard" element={<AdminCEADashBoard/>}/>
                    <Route path="/allceas" element={<AllCEAs/>}/>
                    <Route path="/CEAProfile/:userId" element={<CEAProfile/>}/>
                    <Route path="/allMRFs" element={<AllMRFs/>}/>
                    <Route path="/MRFProfile/:userId" element={<MRFProfile/>}/>
                    <Route path="/AdminMRFDashboard/:userId" element={<AdminMRFDashboard/>}/>
                    <Route path="/getUserSuppliers/:userId" element={<AdminSupplierPage/>}/>
                </Route>

                {/*  MRF Dashboard  */}
                <Route element={<PrivateRouteMRF/>}>
                    <Route path="/MRFDashBoard" element={<MRFDashBoard/>}/>
                    <Route path="/SupplierCollection" element={<SupplierCollection/>}/>
                    <Route path="/CreateSupplier" element={<CreateSupplier/>}/>
                    <Route path="/ViewAllSuppliers" element={<SupplierPage/>}/>
                    <Route path="/AddCategorizedData" element={<CategoryCreation/>}/>
                    <Route path="/MRFNavBar" element={<MRFNavBar/>}/>
                </Route>

                {/*  CEA Dashboard  */}
                <Route element={<PrivateRouteCEA/>}>
                    <Route path="/CEADashboard" element={<CEADashBoard/>}/>
                    <Route path="/CEANavBar" element={<CEANavBar/>}/>
                    <Route path="/AllMRFUsers" element={<AllMRFUsers/>}/>
                    <Route path="/AllMRFUsers" element={<AllMRFUsers/>}/>
                    <Route path="/cea-mrf-dashboard/:userId" element={<CEAMRFDashBoard/>}/>
                    <Route path="/CEASupplierPage/:userId" element={<CEASupplierPage/>}/>
                    <Route path="/CEAPDF" element={<CEAPDF/>}/>
                </Route>

                {/*  Private Routes  */}
                <Route element={<PrivateRouteAdmin/>}>
                    <Route path="/footer" element={<Footer/>}/>
                </Route>

                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/home" element={<HomePage/>}/>
                <Route path="/" element={<WelcomePage/>}/>

            </Routes>
        </BrowserRouter>
    );
}

export default App;
