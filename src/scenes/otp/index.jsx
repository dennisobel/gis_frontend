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

import { useDispatch, useSelector } from "react-redux";
import { setIsAuthenticated, setOtp } from "state";

const OTPForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formValues, setFormValues] = useState({
    otp: "",
  });

  const [formErrors, setFormErrors] = useState({
    otp: false,
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
      otp: validator.isEmpty(formValues.otp),
    };

    setFormErrors(errors);

    if (!Object.values(errors).some(Boolean)) {
      console.log("Form submitted successfully:", formValues);
      dispatch(setOtp(formValues))
      // dispatch(setIsAuthenticated())
      navigate("/dashboard")
    }
  };

  return (
    <Card sx={{ maxWidth: 500, margin: "0 auto", mt: 5, p: 3 }}>
      <form onSubmit={handleSubmit}>
      <TextField
          required
          fullWidth
          margin="normal"
          label="OTP"
          name="otp"
          value={formValues.otp}
          onChange={handleChange}
          error={formErrors.otp}
          helperText={formErrors.otp && "Please enter your otp"}
        />

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
          Submit OTP
        </Button>

      </form>
    </Card>
  )
}

export default OTPForm

