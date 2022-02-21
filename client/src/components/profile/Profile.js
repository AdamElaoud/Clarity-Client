import "./Profile.css";

/*
    props
    - name / account ID
    - icon (to be retrieved from DB)
*/
export default function Profile(props) {
    return (
        <div id = "profile">
            <div id = "name">{props.name}</div>
            <img id = "icon" src = {props.icon} alt = "profile picture"/>
        </div>
    );
}