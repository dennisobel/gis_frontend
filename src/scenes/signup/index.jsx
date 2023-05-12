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
// import state from "state";

const SignUpForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [formValues, setFormValues] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    workId: "",
    password: "",
    role: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: false,
    phoneNumber: false,
    email: false,
    workId: false,
    password: false,
    role: false,
  });

  const options = [
    { value: "management", label: "County Management" },
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
      name: validator.isEmpty(formValues.name),
      phoneNumber: !validator.isMobilePhone(formValues.phoneNumber),
      email: !validator.isEmail(formValues.email),
      workId: !validator.isNumeric(formValues.workId),
      password: validator.isEmpty(formValues.password),
      role: validator.isEmpty(formValues.role),
    };

    setFormErrors(errors);

    if (!Object.values(errors).some(Boolean)) {
      dispatch(setSignup(formValues))
      console.log("Form submitted successfully:", formValues);
      navigate("/otp");
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
          name="phoneNumber"
          value={formValues.phoneNumber}
          onChange={handleChange}
          error={formErrors.phoneNumber}
          helperText={
            formErrors.phoneNumber && "Please enter a valid phone number"
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
        <InputLabel id="select-label">Work ID</InputLabel>
        <TextField
          size="small"
          required
          fullWidth
          margin="normal"
          name="workId"
          type="text"
          value={formValues.workId}
          onChange={handleChange}
          error={formErrors.workId}
          helperText={formErrors.workId && "Please enter a valid ID number"}
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
