import { Button, TextField, Snackbar, Alert } from "@mui/material";
import styles from "../sign-in/SignIn.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { setUserData } from "../../redux/slices/userSlices";
import { useDispatch } from "react-redux";

const SignIn = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState({ email: "", password: "" });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // 'success' or 'error'
const dispatch = useDispatch()
  const loginHandler = async () => {
    const token = localStorage.getItem("access_token");
    console.log(token, "token");

    try {
      const response = await axios.post(
        "http://localhost:3010/user/login",
        login,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data, "data");
      dispatch(setUserData({ email: response.data.user.email, name: response.data.user.firstname ,id:response.data.user._id}));
      navigate('/account',{replace:true})
      setSnackbarMessage("Successfully Signed In!");
      setSnackbarSeverity("success");
    } catch (error) {
      console.error("Error logging in:", error);
      setSnackbarMessage("Login Failed. Please check your credentials.");
      setSnackbarSeverity("error");
    } finally {
      setSnackbarOpen(true);
    }
  };

  const userHandler = (e) => {
    const { name, value } = e.target;
    setLogin((prev) => ({ ...prev, [name]: value }));
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

      <h1>Already Registered?</h1>
      <h4>Login</h4>
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
      <Button variant="contained" onClick={loginHandler}>
        LOGIN
      </Button>
      <div className={styles.child1}>
        <h1>New Customer</h1>
        <p>
          By creating an account with our store, you will be able to move
          through the checkout process faster, store multiple shipping
          addresses, view and track your orders in your account and more.
        </p>
        <Link to="/register">
          <Button sx={{ width: "100%" }} variant="contained">
            CREATE AN ACCOUNT
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
