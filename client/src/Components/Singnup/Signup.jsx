import {
  Button,
  Paper,
  TextField,
  Typography,
  Grid,
  Avatar,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { useState } from "react";
import React from "react";

function Signup() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  var regExp = /[a-zA-Z]/g;

  // Formik starts
  const formik = useFormik({
    initialValues: {
      email: "",
      phone: "",
      password: "",
      cPassword: "",
      fName:''
    },
    onSubmit: (values) => {
      axios({
        url: "/api",
        method: "post",
        data: values,
      })
        .then((response) =>{
            localStorage.setItem('token',response.data.token)
            navigate("/home")
        }
        )
        .catch((error) => {
          console.log(error.response.data.message, "error");
          setError(error.response.data.message);
        });
    },
    validate: (values) => {
      let errors = {};

      if (!values.email) {
        errors.email = "This field is Required";
      } else if (
        !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
          values.email
        )
      ) {
        errors.email = "Invalid email format";
      }
      if (!values.password) {
        errors.password = "This field is Required";
      }else if(values.password.length < 6){
        errors.password = "Atleast 6 Required";
      }

      if (!values.phone) {
        errors.phone = "This field is Required";
      }else  if (regExp.test(values.phone)){
        errors.phone = 'Only numbers Allowed'
      }else if(values.phone.length > 10){
        errors.phone = 'Must be 10 characters or less'
      }
      

      if (!values.cPassword) {
        errors.cPassword = "This field is Required";
      }else if(values.cPassword !== values.password){
        errors.cPassword = 'password not match'
      }

      return errors;
    },
  });

  //formik ends

  return (
    <Grid container>
      <Grid item xs={12} lg={6}>
        <img
          style={{ maxWidth: "100%" }}
          src="https://media.glamourmagazine.co.uk/photos/6138c27c70a13dae5bdec6b8/1:1/w_1000,h_900,c_limit/zayn-glamour-3nov16-pr-b.jpg"
          alt="zayn"
        />
      </Grid>
      <Grid item xs={12} lg={6} mt={4}>
        <Paper
          elevation={10}
          style={{
            padding: 40,
            height: "75vh",
            maxWidth: 400,
            minWidth: 120,
            margin: "40px auto",
          }}
        >
          <Grid align="center" alignItems="center" justifyContent="center">
            <Avatar style={{ backgroundColor: "darkblue" }}>
              <LockIcon />
            </Avatar>
            <Typography mt={2} variant="h5">
              SIGN UP
            </Typography>
          </Grid>
          <form onSubmit={formik.handleSubmit}>
            <Grid mt={5}>
              {/* {error ? <div>{error}</div> : ""} */}
              {error ? <Typography color='error.main' variant='subtitle1' component='div'>{error}</Typography> : ''}
              <TextField
              required
                name="fName"
                style={{ marginTop: "10px" }}
                label="first Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fName}
                fullWidth
              />
            
              <TextField
                name="email"
                type="email"
                style={{ marginTop: "10px" }}
                label="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                fullWidth
              />
              {formik.touched.email && formik.errors.email ? (
               <Typography color='error.main' variant='subtitle1' component='div'>{formik.errors.email}</Typography>
               ) : null}
              <TextField
                name="phone"
                
                style={{ marginTop: "20px" }}
                label="Phone"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                fullWidth
              />
              {formik.touched.phone && formik.errors.phone ? (
               <Typography color='error.main' variant='subtitle1' component='div'>{formik.errors.phone}</Typography>
              ) : null}
              <TextField
                name="password"
                style={{ marginTop: "10px" }}
                label="Password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                fullWidth
              />
              {formik.touched.password && formik.errors.password ? (
               <Typography color='error.main' variant='subtitle1' component='div'>{formik.errors.password}</Typography>
               ) : null}
              <TextField
                name="cPassword"
                style={{ marginTop: "20px" }}
                label="Confirm Password"
                type="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.cPassword}
                fullWidth
              />
              {formik.touched.cPassword && formik.errors.cPassword ? (
               <Typography color='error.main' variant='subtitle1' component='div'>{formik.errors.cPassword}</Typography>
               ) : null}
            </Grid>
            <Grid mt={3}>
              <FormControl component="fieldset">
                <FormGroup aria-label="position" row>
                  <FormControlLabel
                    value="end"
                    control={<Checkbox />}
                    label="Remember Me"
                    labelPlacement="end"
                  />
                </FormGroup>
              </FormControl>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              style={{
                color: "white",
                backgroundColor: "darkblue",
                marginTop: "5px",
              }}
              fullWidth
            >
              Submit
            </Button>
          </form>
          <Typography mt={1} variant="body1">
            Forgot Password?
          </Typography>
          <Typography
            style={{ cursor: "pointer" }}
            variant="body1"
            onClick={() => {
              navigate("/");
            }}
          >
            I have Account? Login
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Signup;
