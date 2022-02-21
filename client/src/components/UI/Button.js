import "./Button.css";

/*
    props
    - className     str | additional classes to apply to the button
    - type          str | a type for the button, if null, automatically applies "button" type
    - onClick       fun | function to perform onClick
*/
export default function Button(props) {
    return (
        <button
            className = {`button ${props.className}`} 
            type = {props.type || "button"} 
            onClick = {props.onClick}
        >
            {props.children}
        </button>
    );
}