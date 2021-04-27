import React, {useState} from 'react'

import {ValidatorForm} from 'react-material-ui-form-validator'

import {
  Typography,
  Grid,
  MenuItem,
  FormControl,
  FormGroup,
  Button,
  Card,
  CardContent,
  TextField,
  Select,
} from '@material-ui/core';

import {TextValidator} from 'react-material-ui-form-validator';
import { useHistory } from 'react-router';

function AddSimulation(props) {

    let history = useHistory(); 
    const [reynolds, setReynolds] = useState(null);
    const [aoa, setAoA] = useState([]);
    const [name, setName] = useState(false);

    const handleSubmit = () => {

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',  'Authorization': 'Bearer ' + localStorage.getItem('token') },
      mode: 'cors',
      body: JSON.stringify({name: name, aoa : aoa, rn : reynolds})

  };

  fetch('http://localhost:8000/run_simulation?id=' + props.location.state.id, requestOptions)
    .then(() => {
        history.push({state: { id: props.location.state.id},pathname : "/results"})
    })
    }

    const handleAoA = (event) => {
        setAoA(event.target.value);
    }

    const handleReynolds = (event) => {
        setReynolds(event.target.value);
    }

    const handleName = (event) => {
      setName(event.target.value);
    }

        return (
          <>
            <Card variant="outlined">
              <br />
              <Grid item>
                <Typography variant="h3" align="center">
                  Simulation Parameters
                </Typography>
              </Grid>
              <br />
              <ValidatorForm>
                <FormGroup>
                  <Card variant="outlined">
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
                      
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <br />

                        </Grid>
                      </Grid>
                      <br />
                      <br />
                      <Grid container spacing={3} variant="outlined">
                        <Grid item xs={6}>
                          <TextValidator
                            id="Reynolds"
                            label="Reynolds Number"
                            onChange={handleReynolds}
                            type="number"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            variant="outlined"
                            validators={[
                              'required',
                              'isPositive',
                              'minNumber:0',
                              'maxNumber:0',
                            ]}
                            errorMessages={[
                              'Required field',
                              'Input must be positive',
                              'Minimum value is 0',
                              'Maximum value is 15',
                            ]}
                          />
                        </Grid>
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