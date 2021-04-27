import React, { useState, useEffect } from 'react'
import "./home.css";
import Logo from "../images/cashew.png";
import { useHistory } from 'react-router'
import { MenuItem } from '@material-ui/core';

import {Link} from "react-router-dom";

function ListSimulations() {

    const [simulations, setSimulations] = useState([]);
    let history = useHistory();

    useEffect (() => {
        fetch('http://localhost:8000/simulations',{
            method: 'GET',
            headers: {
                'Accept': '*/*',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => response.json())
        .then(data => {
            setSimulations(data.data);
        });
    }, []);

        return(

            <div>

                
                <div class="flex-container" style={{padding:30}}>
                        <Link to="/simulations">
                            <img className="image" src={Logo} alt="Cashew"></img>
                        </Link>
                    <div><button color="inherit"  classes="flex-item" onClick={() => { localStorage.clear(); history.push("/")}}>Logout</button></div>
                </div>

                <div>
                    <Link style={{ textDecoration: 'none' }} to={`/create`}>
                        <MenuItem style={{ padding: 20, paddingRight : 200, float : "right", fontSize : 30, fontWeight : 20 }}> Add New </MenuItem>
                    </Link>
                </div>
                <div style={{padding : 100}}>
                    <text style={{fontSize : 20}}>Simulations: </text>
                        {simulations.map((simulation, index) => (
                        <h5 key={index}>
                        <Link to={{state: { id: simulation.id},pathname: '/results'}}>{simulation.name}</Link>
                        </h5>
                        ))}
                </div>
            </div>
        );
    }

export default ListSimulations;