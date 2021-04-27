import React, {useState } from 'react';
import { useHistory } from "react-router-dom";
import {Select,MenuItem,TextField,} from '@material-ui/core';
import URL from './Constants';
import {FormControl, InputLabel} from '@material-ui/core';

function CreateSimulation() {

    let history = useHistory();
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedBaseFile, setSelectedBaseFile] = useState(null);
    const [fileData, setFileData] = useState([]);
    const [simulationName, setSimulationName] = useState(null);


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
            history.push({pathname : "/simulations"})
        })

        
    };


        return(
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

                        <div style={{padding : 30, width : 300, display : "flex", columnGap : 20}}>
                              Airfoil type
                            <Select  style={{width : 200}}
                            //   onChange={handleFoil}
                              errorMessages={['Required field']}
                              displayEmpty
                            >
                              <MenuItem value={12}>NACA0012</MenuItem>
                              <MenuItem value={15}>NACA0015</MenuItem>
                              <MenuItem value={21}>NACA0021</MenuItem>
                            </Select>
                        </div>

                <div style={ {padding: 80}}>
                    <button onClick={onFileUpload}>Create Simulation</button>
                </div>

            </div>
        )

}

export default CreateSimulation;