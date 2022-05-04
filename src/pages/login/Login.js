import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Login.css";

/*
    props:
    - 
*/
export default function Login() {
    const navigate = useNavigate();
    const pincode = useSelector(state => state.data.pincode);
    const [pins, setPins] = useState([null, null, null, null]);

    const pinChangeHandler = (event) => {
        let pinNumber = event.target.id.slice(-1); // last character of ID

        // auto tab (cyclical)
        if (event.target.value !== "") // only auto tab if user typed in value
            document.getElementById(`pin${(parseInt(pinNumber) + 1) % 4}`).focus();

        // store value
        let tempPins = pins;
        tempPins[pinNumber] = event.target.value;
        setPins(tempPins);

        // if all pins have a value, check password
        if (tempPins.every(ele => ele !== null)) {
            const input = tempPins.toString().replaceAll(",", "");
            
            if (input === pincode) {
                localStorage.setItem("isLoggedIn", "true");
                navigate("/dashboard", { replace: true });
            }
        }
    };

    return (
        <div id = "login">
            <div id = "login-backdrop"/>
            <div id = "pins">
                <input id = "pin0" className = "num" type = "password" maxLength = "1" onChange = {pinChangeHandler} />
                <input id = "pin1" className = "num" type = "password" maxLength = "1" onChange = {pinChangeHandler} />
                <input id = "pin2" className = "num" type = "password" maxLength = "1" onChange = {pinChangeHandler} />
                <input id = "pin3" className = "num" type = "password" maxLength = "1" onChange = {pinChangeHandler} />
            </div>
        </div>
    );
}