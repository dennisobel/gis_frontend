import React, { useState } from "react";
import {
  TextField,
  Card,
  Button,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import validator from "validator";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "state";
import { verifyPassword } from '../../helper/helper'

const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
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

  const options = [
    { value: "management", label: "County Management" },
    { value: "governor", label: "Governor" },
    { value: "cec", label: "CEC" },
    { value: "director", label: "Director" },
    { value: "revenueOfficer", label: "Revenue Officer" },
  ];

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
      // dispatch(setIsAuthenticated())
      // axios.post("https://gis.affordit.co.ke/login", formValues)
      // .then(res => console.log("LOGIN:",res))
      let loginPromise = verifyPassword(formValues)
      loginPromise.then(res => {
        let { token } = res.data;
        localStorage.setItem('token', token);
        // dispatch(setLogin(formValues))
        navigate('/otp')
      })
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

        <InputLabel id="select-label">Select a Role</InputLabel>
        {/* <Select
          size="small"
          name="role"
          required
          fullWidth
          margin="normal"
          value={formValues.role}
          onChange={handleChange}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select> */}
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

