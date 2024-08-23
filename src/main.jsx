import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme();
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
   <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
    </ThemeProvider>
  </BrowserRouter>
);
