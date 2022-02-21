import "./Sidebar.css";
import SidebarOption from "./SidebarOption";

/*
    props
    - logout        fun | function to logout the session
*/
export default function Sidebar(props) {
    return (
        <div id = "sidebar">
            <img id = "sidebar-logo" src = "./logo.jpg" alt = "logo"/>
            <div id = "sidebar-options">
                <SidebarOption action = {props.logout} icon = "dashboard"/>
                <SidebarOption action = {props.logout} icon = "calendar"/>
                <SidebarOption action = {props.logout} icon = "profile"/>
                <SidebarOption action = {props.logout} icon = "detox"/>
                <SidebarOption id = "logout" action = {props.logout} icon = "logout"/>
            </div>
        </div>
    );
}