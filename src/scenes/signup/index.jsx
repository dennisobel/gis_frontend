import React, { useState } from "react";
import {
  TextField,
  Card,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSignup } from "state"
import axios from "axios";
import { useEffect } from "react";
import { registerUser } from '../../helper/helper'

const SignUpForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // axios.get("https://gis.affordit.co.ke/roles")
    //   .then(res => {
    //     console.log("roles", res)
    //   })
  }, [])


  const [formValues, setFormValues] = useState({
    name: "",
    msisdn: "",
    email: "",
    id_number: "",
    password: "",
    role_id: "",
    user_type: "",
    kra_brs_number: ""
  });

  const [formErrors, setFormErrors] = useState({
    name: false,
    msisdn: false,
    email: false,
    id_number: false,
    password: false,
    role_id: false,
    user_type: false,
    kra_brs_number: false
  });

  const options = [
    { value: "management", label: "County Management" },
    { value: "governor", label: "Governor" },
    { value: "cec", label: "CEC" },
    { value: "director", label: "Director" },
    { value: "revenueOfficer", label: "Revenue Officer" },
  ];

  const userType = [
    { value: "resident", label: "Resident" },
    { value: "non-resident", label: "Non Resident" },
  ]

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {
      name: validator.isEmpty(formValues.name),
      msisdn: !validator.isMobilePhone(formValues.msisdn),
      email: !validator.isEmail(formValues.email),
      id_number: !validator.isNumeric(formValues.id_number),
      password: validator.isEmpty(formValues.password),
      role_id: validator.isEmpty(formValues.role_id),
    };

    setFormErrors(errors);

    if (!Object.values(errors).some(Boolean)) {
      // axios.post("http://localhost:5001/auth/register", formValues)
      // .then(res => {
      //   console.log("CREATE USER:",res)
      // })
      let registerPromise = registerUser(formValues)
      dispatch(setSignup(formValues))
      registerPromise.then(function(){ navigate('/login')});
      console.log("Form submitted successfully:", formValues);
      // navigate("/otp");
    }
  };

  return (
    <Card sx={{ maxWidth: 500, margin: "0 auto", mt: 5, p: 3 }}>
      <form onSubmit={handleSubmit}>
        <InputLabel id="select-label">Name</InputLabel>
        <TextField
          size="small"
          required
          fullWidth
          margin="normal"
          name="name"
          value={formValues.name}
          onChange={handleChange}
          error={formErrors.name}
          helperText={formErrors.name && "Please enter your name"}
        />
        <InputLabel id="select-label">Phone Number</InputLabel>
        <TextField
          size="small"
          required
          fullWidth
          margin="normal"
          name="msisdn"
          value={formValues.msisdn}
          onChange={handleChange}
          error={formErrors.msisdn}
          helperText={
            formErrors.msisdn && "Please enter a valid phone number"
          }
        />
        <InputLabel id="select-label">Work Email</InputLabel>
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
        <InputLabel id="select-label">ID Number</InputLabel>
        <TextField
          size="small"
          required
          fullWidth
          margin="normal"
          name="id_number"
          type="text"
          value={formValues.id_number}
          onChange={handleChange}
          error={formErrors.id_number}
          helperText={formErrors.id_number && "Please enter a valid ID number"}
        />
        <InputLabel id="select-label">KRA Number</InputLabel>
        <TextField
          size="small"
          required
          fullWidth
          margin="normal"
          name="kra_brs_number"
          type="text"
          value={formValues.kra_brs_number}
          onChange={handleChange}
          error={formErrors.kra_brs_number}
          helperText={formErrors.kra_brs_number && "Please enter a valid KRA number"}
        />
        <InputLabel id="select-label">Are you a resident</InputLabel>
        <Select
          size="small"
          name="user_type"
          required
          fullWidth
          margin="normal"
          value={formValues.user_type}
          onChange={handleChange}
        >
          {userType.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
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
        <Select
          size="small"
          name="role_id"
          required
          fullWidth
          margin="normal"
          value={formValues.role_id}
          onChange={handleChange}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        <p style={{ textAlign: "center", marginTop: "1rem" }}>
          Already have an account? <a href="/login">Log in</a>
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
          Create User
        </Button>
      </form>
    </Card>
  );
};

export default SignUpForm;
