import React, { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  FormGroup
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";
import "./App.css";

import { CREATE_USER } from "./Graphql/mutation";
import { useMutation, useQuery } from "@apollo/client";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [err, setErr] = useState('');


  const [createUser, { error }] = useMutation(CREATE_USER,
    {
      onCompleted: (data) => {
        if(data.createUser.success){
          setErr('');
          setEmail('');
          setUsername('');
          setConfirmPassword('');
          setPassword('');
          alert('user created')
        }
      },
      onError: (error) => {
        console.log(error); 
      },
    }
  );

  const handleSubmit = () => {
    if(email && password && confirmPassword && username && confirmPassword === password){
      createUser({
        variables: {
          username,
          email,
          password
        },
      });
    }else if(confirmPassword != password){
      setErr("Password not matched")
    }
    else{
      setErr("fill all fields")
    }
  }
  console.log({err})
  return (
    <Container className="box">
      <Box
        sx={{
          width: 450,
          height: "fit-content",
          border: "1px solid black",
          textAlign: "center",
        }}
      >
        <div className="box_head">
          <Link to="/login">
            {" "}
            <p>
              Already a member? <span>Sign in now!</span>
            </p>
          </Link>
        </div>
        <div>
          <h2>Sign up</h2>
          <p>to open your account</p>
          <div className="input_fields">
            <TextField
              id="standard-basic"
              label="User name"
              variant="standard"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
            />
            <br />
            <TextField id="standard-basic" label="Email" variant="standard" value={email} onChange={(e)=>setEmail(e.target.value)}/>

            <TextField
              id="standard-basic"
              label="Password"
              variant="standard"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                      style={{ width: "fit-content" }}
                    >
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              id="standard-basic"
              label="Password confirmation"
              variant="standard"
              value={confirmPassword}
              onChange={(e)=>setConfirmPassword(e.target.value)}
              type={showConfirmPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => {
                        setShowConfirmPassword(!showConfirmPassword);
                      }}
                      style={{ width: "fit-content" }}
                    >
                      {showConfirmPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <p style={{color:'red'}}>{err}</p>
            <FormGroup>
              <FormControlLabel control={<Checkbox defaultChecked />} label="I agree with Terms and Conditions" />
            </FormGroup><br/>
            <Button variant="contained" onClick={handleSubmit}>Sign up</Button>
          </div>
        </div>
      </Box>
    </Container>
  );
};

export default Signup;