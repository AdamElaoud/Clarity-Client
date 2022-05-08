import Card from "../../UI/Card";
import MatrixQuadrant from "./MatrixQuadrant";
import "./TaskMatrix.css";

export default function TaskMatrix() {
    return (
        <div id = "taskmatrix">
            <MatrixQuadrant type = "ui" className = "green top-left-border" top = "Urgent" left = "Important"/>
            <MatrixQuadrant type = "nui" className = "blue top-right-border" top = "Not Urgent"/>
            <MatrixQuadrant type = "uni" className = "yellow bottom-left-border" left = "Not Important"/>
            <MatrixQuadrant type = "nuni" className = "red bottom-right-border" />
        </div>
    );
}