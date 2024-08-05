/* eslint-disable no-unused-vars */
import { Button, Snackbar, Alert } from "@mui/material";
import styles from "../register/Register.module.css";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/slices/userSlices";

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
      console.error(error);
      setSnackbarMessage("Registration Failed. Please try again.");
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
      <Link to="/">or Return to Store</Link>
    </div>
  );
};

export default Register;
