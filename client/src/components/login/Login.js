import { useRef } from "react";
import "./Login.css";

/*
    props
    - login         fun | function to perform login
*/
export default function Login(props) {
    const pin1 = useRef();
    const pin2 = useRef();
    const pin3 = useRef();
    const pin4 = useRef();
    
    const pinChangeHandler = (event) => {
        // auto tab
        if (event.target.id === "pin1" && event.target.value.length > 0)
            document.getElementById("pin2").focus();
        else if (event.target.id === "pin2" && event.target.value.length > 0)
            document.getElementById("pin3").focus();
        else if (event.target.id === "pin3" && event.target.value.length > 0)
            document.getElementById("pin4").focus();
        
        // if all pins have a value, check the password
        if (pin1.current.value.length > 0 && pin2.current.value.length > 0 && 
            pin3.current.value.length > 0 && pin4.current.value.length > 0 &&
            pin1.current.value === "8" && pin2.current.value === "7" && 
            pin3.current.value === "5" && pin4.current.value === "3")
            props.login();
    };

    return (
        <div id = "login">
            <div id = "login-backdrop"/>
            <div id = "pins">
                <input id = "pin1" className = "num" type = "password" maxLength = "1" ref = {pin1} onChange = {pinChangeHandler}/>
                <input id = "pin2" className = "num" type = "password" maxLength = "1" ref = {pin2} onChange = {pinChangeHandler}/>
                <input id = "pin3" className = "num" type = "password" maxLength = "1" ref = {pin3} onChange = {pinChangeHandler}/>
                <input id = "pin4" className = "num" type = "password" maxLength = "1" ref = {pin4} onChange = {pinChangeHandler}/>
            </div>
        </div>
    );
}