import "./Button.css";

/*
    props
    - className     str | additional classes to apply to the button
    - id            str | css id to apply to the button
    - type          str | a type for the button, if null, automatically applies "button" type
    - onClick       fun | function to perform onClick
    - disabled     bool | boolean to set disabled status
*/
export default function Button(props) {
    return (
        <button
            className = {`button ${props.className}`}
            id = {props.id}
            type = {props.type || "button"} 
            onClick = {props.onClick}
            disabled = {props.disabled}
        >
            {props.children}
        </button>
    );
}