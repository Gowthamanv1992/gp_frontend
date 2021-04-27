import React, {useState } from 'react';
import { useHistory } from "react-router-dom";
import {TextField,} from '@material-ui/core';
import URL from './Constants';
import {Link} from "react-router-dom";
import Logo from "../images/cashew.png";
import CircularProgress from '@material-ui/core/CircularProgress';


function CreateSimulation() {

    let history = useHistory();
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedBaseFile, setSelectedBaseFile] = useState(null);
    const [simulationName, setSimulationName] = useState(null);

    const [loading, setLoading] = useState(false);

    const onFileChange = event => {
        setSelectedFile(event.target.files[0]);
    };

    const onBaseFileChange = event => {
        setSelectedBaseFile(event.target.files[0]);
    }

    const handleInput = (event) => {
        setSimulationName(event.target.value);
    }

    const onFileUpload = () => {

        setLoading(true);

        let formData = new FormData();
        
        formData.append('file', selectedFile);
        formData.append('base_file', selectedBaseFile);
        formData.append('name', simulationName);

        fetch(URL + '/simulations', {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: formData
        })
        .then(() => {
            setLoading(false);
            history.push({pathname : "/simulations"})
        })

    };


        return(

            loading ? <div style={{width : 180, height : 180, top : "50%", left : "50%", position : "absolute"}}><CircularProgress style={{width : 100, height : 100}}> </CircularProgress> <br/>
                <text style={{textAlign : "center"}}>ML Training in progress!</text>
            </div> :
            
            <div>
                <div class="flex-container" style={{padding:30}}>
                        <Link to="/simulations">
                            <img className="image" src={Logo} alt="Cashew"></img>
                        </Link>
                    
                    <div><button color="inherit"  classes="flex-item" onClick={() => { history.push("/help")}}>Help</button></div>
                    <div><button color="inherit"  classes="flex-item" onClick={() => { localStorage.clear(); history.push("/")}}>Logout</button></div>
                
                </div>
            
                <div style={{padding : 30}}><button color="inherit"  classes="flex-item" onClick={() => { history.push("/simulations")}}>Back</button></div>

            <div style={{ display: "flex", paddingTop: 10, paddingBottom: 10, paddingLeft : 40 , flexDirection : "column"}}>

                <div style={{padding : 30}}>
                    Simulation
                    <TextField style={{width : 200, paddingLeft : 30}} value={simulationName} onChange={handleInput} />
                </div>

                <div style={ {padding: 30}}> Input Dataset
                        <input style={ {padding: 10}} type="file" onChange={onFileChange} />
                </div>

                <div style={{padding : 30, width : 300, display : "flex", columnGap : 20}}>
                    Upload Basecase
                    <input style={ {padding: 10}} type="file" onChange={onBaseFileChange} />
                    
                </div>

                <div style={ {padding: 80}}>
                    <button onClick={onFileUpload}>Create Simulation</button>
                </div>

            </div>

        </div>
        )

}

export default CreateSimulation;