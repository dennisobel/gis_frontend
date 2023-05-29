import React, { useState, useEffect } from "react";
import {
  TextField,
  Card,
  Button
} from "@mui/material";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
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
    if (user) {
      dispatch(setLogin(user));
    }
  }, [user, dispatch]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUsername();
        setUser(res);
      } catch (error) {
        console.log("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      const msisdn = user.msisdn;
      if (msisdn) {
        generateOTP(msisdn)
          .then((OTP) => {
            console.log(OTP);
            if (OTP) {
              toast.success('OTP has been sent to your SMS!');
            } else {
              toast.error('Problem while generating OTP!');
            }
          })
          .catch((error) => {
            console.log("Error generating OTP:", error);
          });
      } else {
        console.log("Email not found");
      }
    }
  }, [user]);

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
      let { status } = await verifyOTP({ msisdn: user.msisdn, code: formValues.code })
      if (status === 201) {
        toast.success('Verify Successfully!')
        if (user.role === "revenueOfficer") {
          return navigate('/appdownload')
        } else {
          return navigate('/dashboard')
        }
      }
    }
  };

  return (
    <>
      <Card sx={{ maxWidth: 500, margin: "0 auto", mt: 5, p: 3 }}>
      <ToastContainer />
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

export default React.memo(OTPForm)