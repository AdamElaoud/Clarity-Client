import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
import SidebarOption from "./SidebarOption";

/*
    props
    -
*/
export default function Sidebar(props) {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("isLoggedIn");
        navigate("/login", { replace: true });
    }

    return (
        <div id = "sidebar">
            <img id = "sidebar-logo" src = "./logo.jpg" alt = "logo"/>
            <div id = "sidebar-options">
                <SidebarOption action = {props.logout} icon = "dashboard"/>
                <SidebarOption action = {props.logout} icon = "checklist"/>
                <SidebarOption action = {props.logout} icon = "calendar"/>
                <SidebarOption action = {props.logout} icon = "profile"/>
                <SidebarOption action = {props.logout} icon = "detox"/>
                <SidebarOption id = "logout" action = {logout} icon = "logout"/>
            </div>
        </div>
    );
}