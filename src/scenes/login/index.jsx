import React, { useEffect, useState } from "react";
import {
  TextField,
  Card,
  Button,
  InputLabel
} from "@mui/material";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import { getUsername, verifyPassword, getCounty } from '../../helper/helper'
import { useDispatch,useSelector } from "react-redux";
import { setLoggedCounty, setLoggedUser } from "state";

const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => state.global.user)

  useEffect(()=>{
    user !== undefined && getCounty(user?.county_id).then(res => dispatch(setLoggedCounty(res)))
  },[])
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    role: ""
  });

  const [formErrors, setFormErrors] = useState({
    email: false,
    password: false,
    role: false,
  });

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {
      email: !validator.isEmail(formValues.email),
      password: validator.isEmpty(formValues.password),
    };

    setFormErrors(errors);

    if (!Object.values(errors).some(Boolean)) {
      console.log("Form submitted successfully:", formValues);
      let loginPromise = verifyPassword(formValues)
      loginPromise.then(res => {
        let { token } = res.data;
        localStorage.setItem('token', token);
        navigate('/otp')
      })
      .then(getUsername().then(res => dispatch(setLoggedUser(res))))
      .then()
    }
  };

  return (
    <Card sx={{ maxWidth: 500, margin: "0 auto", mt: 5, p: 3 }}>
      <form onSubmit={handleSubmit}>
        <InputLabel id="select-label">Email</InputLabel>
        <TextField
          size="small"
          required
          fullWidth
          margin="normal"
          name="email"
          type="email"
          value={formValues.email}
          onChange={handleChange}
          error={formErrors.email}
          helperText={formErrors.email && "Please enter a valid email address"}
        />
        <InputLabel id="select-label">Password</InputLabel>
        <TextField
          size="small"
          required
          fullWidth
          margin="normal"
          name="password"
          type="password"
          value={formValues.password}
          onChange={handleChange}
          error={formErrors.password}
          helperText={formErrors.kra && "Please enter your password"}
        />

        <p style={{ textAlign: "center", marginTop: "1rem" }}>
          You don't have an account? <a href="/">Sign Up</a>
        </p>

        <Button
          variant="contained"
          type="submit"
          sx={{
            marginTop: 4,
            paddingX: 4,
            paddingY: 2,
            borderRadius: 2,
            boxShadow: "none",
            backgroundColor: "teal",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#0039cb",
              boxShadow: "none",
            },
          }}
        >
          Login
        </Button>

      </form>
    </Card>
  )
}

export default LoginForm

