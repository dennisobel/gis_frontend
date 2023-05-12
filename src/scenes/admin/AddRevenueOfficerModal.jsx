import React, { useState, useRef } from "react";
import { Box, useTheme, Button, Modal, TextField, Typography, Select, MenuItem, InputLabel } from "@mui/material";
  
  import { useDispatch } from "react-redux";
  import { setRevenueOfficer } from "state";
  import validator from "validator";

  const AddRevenueOfficerModal = ({ isOpen, onClose }) => {
    const theme = useTheme();
    const dispatch = useDispatch()
    const options = [
      { value: "block_a", label: "Block A" },
      { value: "block_b", label: "Block B" },
    ];
  
    const [formValues, setFormValues] = useState({
      name: "",
      phoneNumber: "",
      email: "",
      workId: "",
      password: "",
      block: ""
    });
  
    const [formErrors, setFormErrors] = useState({
      name: false,
      phoneNumber: false,
      email: false,
      workId: false,
      password: false,
      block: false,
    });
  
    const handleChange = (e) => {
      setFormValues({
        ...formValues,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
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
        dispatch(setRevenueOfficer(formValues))
        console.log("Form submitted successfully:", formValues);
      }
  
      onClose();
    };
  
    return (
      <Modal open={isOpen} onClose={onClose}>
        <Box sx={{
          display: "block",
          position: "fixed",
          height: 600,
          width: 400, bgcolor: "background.paper", p: 2,
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          margin: "auto",
          alignItems: "center",
          justifyContent: "center",
        }}>
  
  
          <Box component="form" onSubmit={handleSubmit}>
            <Typography variant="h6" gutterBottom>
              Add Revenue Officer
            </Typography>
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
  
              <InputLabel id="select-label">Select Block</InputLabel>
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
  
              <Button
                variant="contained"
                type="submit"
                sx={{
                  margin: "auto",
                  display: "block",
                  marginTop: 4,
                  paddingX: 4,
                  paddingY: 2,
                  borderRadius: 2,
                  boxShadow: "none",
                  backgroundColor: theme.palette.secondary.light,
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#0039cb",
                    boxShadow: "none",
                  },
                }}
              >
                Add Revenue Officer
              </Button>
            </form>
          </Box>
        </Box>
      </Modal>
    );
  }

  export default AddRevenueOfficerModal