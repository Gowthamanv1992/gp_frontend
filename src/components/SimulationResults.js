import React, {useState, useEffect, useRef } from 'react'
import { DataGrid } from '@material-ui/data-grid';
import {Link} from "react-router-dom";
import Logo from "../images/cashew.png";
import { useHistory } from 'react-router'
import URL from './Constants';
import { MenuItem } from '@material-ui/core';


const columns = [
    
    { field: 'name', headerName: 'Name', width: 150 },
    { headerName: 'AoA', field: 'aoa', width: 100 },
    { headerName: 'CA1', field: 'ca1', width: 80 },
    { headerName: 'CA2', field: 'ca2', width: 80 },
    { headerName: 'CE1', field: 'ce1', width: 80 },
    { headerName: 'CE2', field: 'ce2', width: 150 },
    { headerName: 'Predicted Cl', field: 'predicted_lift', width: 150 },
    { headerName: 'Predicted Cd', field: 'predicted_drag', width: 150 },
    { headerName: 'Cl', field: 'actual_lift', width: 150 },
    { headerName: 'Cd', field: 'actual_drag', width: 150 },
    { headerName: 'Start Time', field: 'start_time', width: 200 },
    
]

function SimulationResults(props) {

    let history = useHistory();
    const [results, setResults] = useState([]);

    const [simulationName, setSimulationName] = useState(null);
    const [re, setRe] = useState(null);

    const apiCall = () => {
        let isSubscribed = true;
        
        fetch(URL + '/run_simulation?id=' + props.location.state.id,{
            method: 'GET',
            headers: {
                'Accept': '*/*',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => response.json())
        .then(data => {
            if(isSubscribed)
                setResults(data.data);
                setSimulationName(data.simulation_name);
                setRe(data.rn);
        });

        return () => (isSubscribed = false);
    }

    useInterval(() => {
        apiCall();
      }, 3000);

      function useInterval(callback, delay) {
        const savedCallback = useRef();
      
        // Remember the latest callback.
        useEffect(() => {
          savedCallback.current = callback;
        }, [callback]);
      
        // Set up the interval.
        useEffect(() => {
          function tick() {
            savedCallback.current();
          }
          if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
          }
        }, [delay]);
      };

    useEffect (() => {
        apiCall();
    }, [props.location.state.id]);


        return(
            <div>

                <div class="flex-container" style={{padding:30}}>
                        <Link to="/simulations">
                            <img className="image" style={{width : 200}} src={Logo} alt="Cashew"></img>
                        </Link>
                    <div><button color="inherit"  classes="flex-item" onClick={() => { localStorage.clear(); history.push("/")}}>Logout</button></div>
                </div>

                <div style={{padding : 25}}>
                    <span style={{padding : 20}}><b>Simulation Name</b> : {simulationName}</span>
                    <span style={{padding : 20}}><b>Turbulance Model</b> : M-L SST k-w</span>
                    <span style={{padding : 20}}><b>Reynolds Number</b> : {re}</span>

                    <span>
                    <Link to={{state: { id: props.location.state.id},pathname: '/run'}}>
                    <MenuItem style={{ color : "green", paddingRight : 200, float : "right", fontSize : 20, fontWeight : 15 }}>Run New Simulation</MenuItem>
                    </Link>
                </span>
                </div>


                <br/>
                <div style={{height: 700, width: '100%', paddingLeft : 10,paddingRight : 10, paddingTop : 10}}>
                    <DataGrid scrollbarSize={0} disableColumnMenu  pagination rows={results} columns={columns}  checkboxSelection={false} />
                </div>

            </div>
        )

}

export default SimulationResults;