import Card from "./Card";
import "./InfoPopup.css";

export default function InfoPopup(props) {
    return (
        <Card className = "infopopup">
            {props.text}
        </Card>
    );
}