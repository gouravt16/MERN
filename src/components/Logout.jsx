import React from "react";
import { useNavigate } from "react-router-dom";


function Logout() {
    const navigate = useNavigate();
    const logoutUser = () => {
        sessionStorage.removeItem('token')
        navigate('/');
    }
    return (<button className="logout" onClick={logoutUser}>Logout</button>)
}

export default Logout;