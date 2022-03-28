import React,{useState} from 'react';
import { Container, Box, TextField, Button } from "@mui/material";
import { Link } from 'react-router-dom';
import "./App.css";
import {useNavigate} from 'react-router-dom'

import { useMutation, useQuery } from "@apollo/client";
import { LOGIN_USER } from "./Graphql/mutation";
const Login = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  const [loginUser, { error }] = useMutation(LOGIN_USER,
    {
      onCompleted: (data) => {
        if(data.loginUser.success){
          navigate('/home')
        }
      },
      onError: (error) => {
        console.log(error); 
      },
    }
  );

  const handleSubmit = () => {
    if(email && password ){
      loginUser({
        variables: {
          email,
          password
        },
      });
    }
    else{
      setErr("fill all fields")
    }
  }
  console.log(err)
  return (
    <Container className='box'>
      <Box
        sx={{
          width: 450,
          height: 'fit-content',
          border: '1px solid black',
          textAlign: 'center'
        }}
      >
        <div className='box_head'>
          <Link to="/signup"> <p>Not a member? <spna>Sign up now!</spna></p></Link>
        </div>
        <div>
          <h2>Sign in</h2>
          <p>to access your account</p>
          <div className='input_fields'>
            <TextField id="standard-basic" label="Email" variant="standard" value={email} onChange={(e)=>setEmail(e.target.value)}/><br/>
            <TextField id="standard-basic" label="Password" variant="standard" type='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <Button variant="contained" onClick={handleSubmit}>Sign in</Button>
          </div>
          <Link to="/reset"><p>Forget your password?</p></Link>
        </div>
      </Box>
    </Container>
  )
}

export default Login