import React, {useState, useEffect} from 'react'
import { DataGrid } from '@material-ui/data-grid';
import {Link} from "react-router-dom";
import Logo from "../images/cashew.png";
import { useHistory } from 'react-router'
import URL from './Constants';

const columns = [
    
    { field: 'name', headerName: 'Name', width: 150 },
    { headerName: 'AoA', field: 'aoa', width: 80 },
    { headerName: 'CA1', field: 'ca1', width: 80 },
    { headerName: 'CA2', field: 'ca2', width: 80 },
    { headerName: 'CE1', field: 'ce1', width: 80 },
    { headerName: 'CE2', field: 'ce2', width: 80 },
    { headerName: 'Predicted Cl', field: 'predicted_lift', width: 150 },
    { headerName: 'Predicted Cd', field: 'predicted_drag', width: 150 },
    { headerName: 'Cl', field: 'actual_lift', width: 120 },
    { headerName: 'Cd', field: 'actual_drag', width: 120 },
    { headerName: 'Start Time', field: 'start_time', width: 200 },
    
]

function SimulationResults(props) {

    let history = useHistory();
    const [results, setResults] = useState([]);

    const [simulationName, setSimulationName] = useState(null);
    const [re, setRe] = useState(null);

    useEffect (() => {

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
    }, [props.location.state.id]);


        return(
            <div>

                <div class="flex-container" style={{padding:30}}>
                        <Link to="/simulations">
                            <img className="image" src={Logo} alt="Cashew"></img>
                        </Link>
                    <div><button color="inherit"  classes="flex-item" onClick={() => { localStorage.clear(); history.push("/")}}>Logout</button></div>
                </div>

                <div style={{padding : 25}}>
                    <span style={{padding : 20}}><b>Simulation Name</b> : {simulationName}</span>
                    <span style={{padding : 20}}><b>Solver</b> : M-L SST k-w</span>
                    <span style={{padding : 20}}><b>Reynolds Number</b> : {re}</span>
                </div>

                <div>
                    <Link to={{state: { id: props.location.state.id},pathname: '/run'}}>Run New Simulation</Link>
                </div>

                <div style={{height: 700, width: '100%', paddingLeft : 10,paddingRight : 10, paddingTop : 40}}>
                    <DataGrid scrollbarSize={0} disableColumnMenu  pagination rows={results} columns={columns}  checkboxSelection={false} />
                </div>

            </div>
        )

}

export default SimulationResults;