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
import counties from "state/counties";
import { registerUser } from '../../helper/helper'
import axios from "axios";

const SignUpForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState({
    name: "",
    msisdn: "",
    email: "",
    id_number: "",
    password: "",
    role: "",
    user_type: "",
    kra_brs_number: "",
    ministry: "",
    county_id: ""
  });

  const [formErrors, setFormErrors] = useState({
    name: false,
    msisdn: false,
    email: false,
    id_number: false,
    password: false,
    role: false,
    user_type: false,
    kra_brs_number: false,
    ministry: false,
    county_id: false
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
      role: validator.isEmpty(formValues.role),
    };

    setFormErrors(errors);

    if (!Object.values(errors).some(Boolean)) {
      // axios.post("https://gis.affordit.co.ke/users", formValues)
      // .then(res => {
      //   console.log("CREATE USER:",res)
      // })
      let registerPromise = registerUser(formValues)
      dispatch(setSignup(formValues))
      registerPromise.then(function () { navigate('/login') });
      setTimeout(() => {
        // navigate("/login");
      }, 2000);
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
        <InputLabel id="select-label">County</InputLabel>
        <Select
          size="small"
          name="county_id"
          required
          fullWidth
          margin="normal"
          value={formValues.county_id}
          onChange={handleChange}
        >
          {counties.map((option) => (
            <MenuItem key={option.code} value={option.code}>
              {option.name}
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
        </Select>

        {
          formValues.role === "cec" || formValues.role === "director" ? <>
            <InputLabel id="select-label">Which Ministry do you work for</InputLabel>
            <TextField
              size="small"
              required
              fullWidth
              margin="normal"
              name="ministry"
              type="text"
              value={formValues.ministry}
              onChange={handleChange}
              error={formErrors.ministry}
              helperText={formErrors.ministry && "Please enter a valid Ministry"}
            />
          </> : <></>
        }
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
