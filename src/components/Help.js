import React from 'react';
import BaseCase from "../images/baseCase.tar.gz"
import {Link} from "react-router-dom";
import Logo from "../images/cashew.png";
import { useHistory } from "react-router-dom";


function Help(props) {

    let history = useHistory();

    return (
    
        <div>
            <div class="flex-container" style={{padding:30}}>
                <Link to="/simulations">
                    <img className="image" style={{width : 200}} src={Logo} alt="Cashew"></img>
                </Link>
                
                <div><button color="inherit"  classes="flex-item" onClick={() => { localStorage.clear(); history.push("/")}}>Logout</button></div>
                
            </div>

            <div style={{padding : 30}}><button color="inherit"  classes="flex-item" onClick={() => { history.push("/create")}}>Back</button></div>

            <div style={{paddingLeft : 40}}>
                <h1 style={{paddingTop : 30, color : "green"}}>Instructions to Use Basecase:</h1>
                <li style={{paddingTop : 30, paddingLeft : 60, fontSize : 20, color : "grey"}}>Download the basecase from <a href={BaseCase} download="baseCase.tar.gz">here</a> </li>
                <li style={{paddingTop : 30, paddingLeft : 60, fontSize : 20, color : "grey"}}>In file ‘parameters’ change the value of Reynolds number, viscosity (viscosity=1/Re)</li>
                <li style={{paddingTop : 30, paddingLeft : 60, fontSize : 20, color : "grey"}}>In folder ‘constant’ change folder ‘polyMesh’ by your own mesh folder</li>
                <li style={{paddingTop : 30, paddingLeft : 60, fontSize : 20, color : "grey"}}>Make sure that the patches names must correspond to the patches names in files inside folder ‘0’</li>
            </div>
        </div>
    
    );

    
}


export default Help;