import React, {useState } from 'react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Redirect } from 'react-router-dom';
import URL from './Constants';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();

  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [check, setCheck] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  function onEmailChange(event) {
    setEmail(event.target.value);
    }

    function onClickChange(event) {
        setCheck(prevValue => !prevValue);
    }

    function ValidateUser(event) {
        event.preventDefault();
    }

    function onPasswordChange(event){
        setPassword(event.target.value);
    }

    if (isLoggedIn) {
        return <Redirect to='/simulations' />
    }

    function handleClick() {

      if(check) {
          const requestOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              mode: 'cors',
              body: JSON.stringify({username: email, password : password})
          };
  
          fetch(URL + '/users/register', requestOptions)
          
          setTimeout(() => {
              login()
            }, 2000);

      } else {
          login()
      }
  }

    function login() {
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          mode: 'cors',
          body: JSON.stringify({username: email, password : password})
      };

      fetch(URL + '/api/token', requestOptions)
      .then(response => response.json())
      .then(data => {
          if('access' in data) {
              localStorage.setItem('token', data.access);
              setIsLoggedIn(true);
          }
          
      }).catch(function() {
          console.log("error");
      });

  }


  return (

    localStorage.getItem('token') !== null ? <Redirect to='/simulations' /> :

    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={ValidateUser}>
          <TextField
            variant="outlined"
            onChange={onEmailChange}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            onChange={onPasswordChange}
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox onChange={onClickChange} value="remember" color="primary" />}
            label="New User?"
          />
          <Button
            type="submit"
            fullWidth
            onClick = {handleClick}
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>

        </form>
      </div>

    </Container>
  );
}