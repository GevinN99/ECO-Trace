import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import WelcomePage from "./components/WelcomePage";
import CreateNewAdminPage from "./components/CreateNewAdminPage";
import CreateMRFPage from "./components/CreateMRFPage";
import CreateCEAPage from "./components/CreateCEAPage";

function App() {
  return (
      <BrowserRouter>
        <Routes>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/signup" element={<CreateNewAdminPage/>}/>
            <Route path="/home" element={<HomePage/>}/>
            <Route path="/" element={<WelcomePage/>}/>
            <Route path="/createmrf" element={<CreateMRFPage/>}/>
            <Route path="/createcea" element={<CreateCEAPage/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
