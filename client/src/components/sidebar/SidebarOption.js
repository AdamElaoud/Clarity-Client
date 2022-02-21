import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCalendarAlt, faLeaf, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faTrello } from "@fortawesome/free-brands-svg-icons";

import "./SidebarOption.css";

/*
    props
    - action        fun | on click function for the button
    - icon          str | string indicating what icon should be loaded
    - id            str | id to be used for loading dinstinct CSS styles
*/
export default function SidebarOption(props) {
    let icon;

    switch (props.icon) {
        case "dashboard":
            icon = <FontAwesomeIcon icon = {faTrello}/>;
            break;
        case "calendar":
            icon = <FontAwesomeIcon icon = {faCalendarAlt}/>;
            break;
        case "profile":
            icon = <FontAwesomeIcon icon = {faUser}/>;
            break;
        case "detox":
            icon = <FontAwesomeIcon icon = {faLeaf}/>;
            break;
        case "logout":
            icon = <FontAwesomeIcon icon = {faSignOutAlt}/>;
            break;
    }

    return (
        <div id = {props.id} className = "sidebarOption" onClick = {props.action}>
            {icon}
        </div>
    );
}