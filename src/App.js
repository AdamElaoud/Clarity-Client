import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Sidebar from "./components/sidebar/Sidebar";
import './App.css';
import Statusbar from "./pages/statusbar/Statusbar";

export default function App() {
    const navigate = useNavigate();

    useEffect(() => {
        // check login status
        const loginStatus = localStorage.getItem("isLoggedIn");

        if (loginStatus === "true") {
            // route to dashboard
            navigate("/dashboard", { replace: true });
            
        } else {
            // route to login page
            navigate("/login", { replace: true });
        }

    // eslint-disable-next-line
    }, [])

    return (
        <main id = "app">
            <Routes>
                <Route path = "/login" element = { <Login /> }/>
                <Route path = "/dashboard" element = {
                    <>
                        <Sidebar />
                        <Dashboard /> 
                        <Statusbar />
                    </>
                }/>
            </Routes>
        </main>
    );
} 