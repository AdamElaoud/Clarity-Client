import { Checkbox } from "@mui/material"
import "./CheckInput.css";

/*
    props
    - className     str | additional classes to apply to the checkbox
    - onClick       fun | function to perform onClick
*/
export default function CheckInput(props) {
    return (
        <Checkbox
            defaultChecked = {false}
            size = "large"
            onChange = {props.onClick}
            className = {props.className}
            color = "success"
        >
            {props.children}
        </Checkbox>
    );
}