/* eslint-disable no-unused-vars */
import { Button, Snackbar, Alert } from "@mui/material";
import styles from "../register/Register.module.css";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/slices/userSlices";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  link: {
    textDecoration: 'none', // Remove default underline
    color: 'inherit', // Use the color from the parent or specify your own
    '&:hover': {
      textDecoration: 'underline', // Add underline on hover
    },
  },
});

const Register = () => {
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // 'success' or 'error'
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const classes = useStyles();

  const userHandler = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const saveHandler = async () => {
    const { fname, lname, email, password } = user;
    if (!fname || !lname || !email || !password) {
      setSnackbarMessage("Please fill in all required fields.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3010/user/register",
        user
      );
      console.log(response.data, "data",response.data.user._id);

      dispatch(setUserData({ email: email, name: fname ,id:response.data.user._id}));

      localStorage.setItem("access_token", response.data.token);
      navigate('/',{replace:true})
      setSnackbarMessage("Successfully Registered!");
      setSnackbarSeverity("success");
    } catch (error) {
      console.log(error,'hello');
      setSnackbarMessage(error.response.data.message);
      setSnackbarSeverity("error");
    } finally {
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className={styles.container}>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        action={
          <Button color="inherit" onClick={handleCloseSnackbar}>
            Close
          </Button>
        }
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <h1>Create an Account</h1>
      <h4>Personal Information</h4>
      <TextField
        required
        id="outlined-required"
        label="First Name"
        name="fname"
        placeholder="Enter First Name"
        size="small"
        onChange={(e) => userHandler(e)}
      />
      <TextField
        required
        id="outlined-required"
        label="Last Name"
        name="lname"
        placeholder="Enter Last Name"
        size="small"
        onChange={(e) => userHandler(e)}
      />
      <TextField
        required
        type="email"
        id="outlined-required"
        label="Email"
        name="email"
        placeholder="Enter Email"
        size="small"
        onChange={(e) => userHandler(e)}
      />
      <TextField
        required
        id="outlined-password-input"
        label="Enter Password"
        type="password"
        name="password"
        autoComplete="current-password"
        size="small"
        onChange={(e) => userHandler(e)}
      />
      <Button variant="contained" onClick={saveHandler}>
        CREATE
      </Button>
       <div>
      <Link to='/signin' className={classes.link}>Sign in</Link><br/>
      <Link to="/" className={classes.link}>Return to Store</Link>
    </div>
    </div>
  );
};

export default Register;
