import "./Card.css";

/*
    props
    - id            str | CSS id to be applied
    - className     str | CSS classes to be applied
*/
export default function Card(props) {
    const classes = props.className ? `card ${props.className}` : "card";
    const id = props.id ? props.id : null;

    return (
        <div id = {id} className = {classes}>
            {props.children}
        </div>
    );
}