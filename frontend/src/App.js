import './App.css';
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import WelcomePage from "./components/WelcomePage";
import SignupPage from "./components/SignupPage";

function App() {
  return (
      <BrowserRouter>
        <Routes>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/signup" element={<SignupPage/>}/>
            <Route path="/home" element={<HomePage/>}/>
            <Route path="/" element={<WelcomePage/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
