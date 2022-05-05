import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
import SidebarOption from "./SidebarOption";

/*
    props
    -
*/
export default function Sidebar() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("isLoggedIn");
        navigate("/login", { replace: true });
    }

    return (
        <div id = "sidebar">
            <img id = "sidebar-logo" src = "./logo.jpg" alt = "logo"/>
            <div id = "sidebar-options">
                <SidebarOption action = {() => navigate("/dashboard", { replace: true })} icon = "dashboard"/>
                <SidebarOption action = {() => navigate("/todos", { replace: true })} icon = "todos"/>
                <SidebarOption action = {() => navigate("/dashboard", { replace: true })} icon = "calendar"/>
                <SidebarOption action = {() => navigate("/dashboard", { replace: true })} icon = "profile"/>
                <SidebarOption action = {() => navigate("/dashboard", { replace: true })} icon = "detox"/>
                <SidebarOption id = "logout" action = {logout} icon = "logout"/>
            </div>
        </div>
    );
}