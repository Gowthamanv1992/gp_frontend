import React, {useState} from 'react'

import {ValidatorForm} from 'react-material-ui-form-validator'
import {Link} from "react-router-dom";
import Logo from "../images/cashew.png";


import URL from './Constants';


import {
  Typography,
  Grid,
  FormGroup,
  Button,
  Card,
  CardContent,
  TextField,
} from '@material-ui/core';

import {TextValidator} from 'react-material-ui-form-validator';
import { useHistory } from 'react-router';

function AddSimulation(props) {

    let history = useHistory(); 
    const [aoa, setAoA] = useState([]);
    const [name, setName] = useState(false);

    const handleSubmit = () => {

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',  'Authorization': 'Bearer ' + localStorage.getItem('token') },
      mode: 'cors',
      body: JSON.stringify({name: name, aoa : aoa})

  };

  fetch(URL + '/run_simulation?id=' + props.location.state.id, requestOptions)
    .then(() => {
        history.push({state: { id: props.location.state.id},pathname : "/results"})
    })
    }

    const handleAoA = (event) => {
        setAoA(event.target.value);
    }

    const handleName = (event) => {
      setName(event.target.value);
    }

        return (
          <>
                <div class="flex-container" style={{padding:30}}>
                    <Link to="/simulations">
                        <img className="image" style={{width : 200}} src={Logo} alt="Cashew"></img>
                    </Link>
                <div><button color="inherit"  classes="flex-item" onClick={() => { localStorage.clear(); history.push("/")}}>Logout</button></div>
            </div>


            <Card>
              <br />

              <Grid item>
                <Typography variant="h3" align="center">
                  Simulation Parameters
                </Typography>
              </Grid>
              <br />
              <br/>
              <ValidatorForm>
                <FormGroup>
                  <Card>
                    <CardContent>

                        <Grid item xs={1} style={{width : 300}}>
                          <TextValidator style={{width : 300}}
                            label="Job Name"
                            onChange={handleName}
                            type="string"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            variant="outlined"
                          />
                        </Grid>
                      
                        <br />
                        <br />
                      <br />
                      <Grid container spacing={3} variant="outlined">
                        <Grid item xs={6}>
                          <TextField
                            id="AoA"
                            label="Angle of Attack"
                            onChange={handleAoA}
                            type="number"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            variant="outlined"
                            validators={['required', 'isPositive', 'minNumber:0']}
                            errorMessages={[
                              'Required field',
                              'Input must be positive',
                              'Minimum value is 0',
                            ]}
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </FormGroup>
              </ValidatorForm>
              <br />
    
                <br />
            </Card>
            <br />
            <center>
              <Button
                variant="contained"
                onClick={() => handleSubmit()}
                size="large"
                color="primary"
                type="submit"
                display="none"
              >
                Launch simulation
              </Button>
            </center>
          </>
        )

}

export default AddSimulation;