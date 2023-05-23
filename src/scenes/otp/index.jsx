import React, { useState, useEffect } from "react";
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
import { setLogin, setOtp } from "state";
import { generateOTP, verifyOTP, getUsername } from '../../helper/helper';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OTPForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formValues, setFormValues] = useState({
    code: "",
  });
  const [user, setUser] = useState()

  useEffect(() => {
    getUser()
  },[])

  const getUser = () => {
    getUsername().then(res => {
      console.log("RES:",res)
      dispatch(setLogin(res))
      setUser(res)
      // user = res;
      const msisdn = res?.msisdn
      if (msisdn) {
        generateOTP(msisdn).then((OTP) => {
          console.log(OTP)
          if (OTP) toast.success('OTP has been send to your sms!');
          toast.error('Problem while generating OTP!')
        })
      } else {
        console.log("email not found")
      }
    })
  }

  const [formErrors, setFormErrors] = useState({
    code: false,
  });

  const handleChange = (e) => {
    e.preventDefault();
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {
      code: validator.isEmpty(formValues.code),
    };

    setFormErrors(errors);

    if (!Object.values(errors).some(Boolean)) {
      console.log("Form submitted successfully:", formValues, user);
      let { status } = await verifyOTP({ msisdn: user.msisdn, code: formValues.code  })
      if(status === 201){
        toast.success('Verify Successfully!')
        // dispatch(setOtp(formValues))
        // dispatch(setLogin(formValues))
        if(user.role === "revenueOfficer") {
          return navigate('/appdownload')
        } else {
          return navigate('/dashboard')
        }
      }  
      // dispatch(setOtp(formValues))
      // dispatch(setIsAuthenticated())
      // navigate("/dashboard")
    }
  };

  return (
    <>
      <ToastContainer />
      <Card sx={{ maxWidth: 500, margin: "0 auto", mt: 5, p: 3 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            required
            fullWidth
            margin="normal"
            label="OTP"
            name="code"
            value={formValues.code}
            onChange={handleChange}
            error={formErrors.code}
            helperText={formErrors.code && "Please enter your otp"}
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
    </>
  )
}

export default OTPForm

