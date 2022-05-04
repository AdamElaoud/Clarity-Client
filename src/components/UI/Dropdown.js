import "./Dropdown.css";

/*
    props
    - id            str | CSS id to be applied
    - className     str | CSS classes to be applied
    - onChange      fun | function to perform on change
    - defaultValue  str | dropdown value to be preselected on load
*/
export default function Dropdown(props) {
    const classes = props.className ? `dropdown ${props.className}` : "dropdown";
    const id = props.id ? props.id : null;

    return (
        <select id = {id} className = {classes} onChange = {props.onChange} defaultValue = {props.defaultValue}>
            {props.children}
        </select>
    );
}