import {
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Paper,
  TextField,
  Button,
  Tabs,
  Tab,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
  Divider,
  Snackbar,
  SnackbarContent,
  IconButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Axios from "../api/Api";
import { useSelector } from "react-redux";
import Account from "./sign-in/Account";
import CloseIcon from "@mui/icons-material/Close";


const Checkout = () => {
  const { id, name, email, address } = useSelector((state) => state.user);
  const orders_list = useSelector((state) => state.order);
  const [ordersList,setOrdersList] = useState([]);
  const [total, setTotal] = useState(0);
  const [tabValue, setTabValue] = useState(0);
  const [open, setOpen] = useState(false);
  console.log(ordersList,'orderss',JSON.parse(sessionStorage.getItem('orders')))

  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    cvv: "",
    nameOnCard: "",
    upiId: "",
    cashOnDelivery: "",
  });
  const [formData, setFormData] = useState({
    street: address.street || "",
    landmark: address.landmark || "",
    city: address.city || "",
    state: address.state || "",
    country: address.country || "",
    phoneNumber: address.phoneNumber || "",
    pincode: address.pincode || "",
  });


  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleChanges = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleCardPayment = (e) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    let payload = {
      userId: id,
      items: ordersList,
      address: formData,
      total,
    };
    try {
      if (payload.items.length > 0) {
        await Axios.post(`/order`, payload);
        handleClick()
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (address) {
      setFormData({
        street: address.street || "",
        landmark: address.landmark || "",
        city: address.city || "",
        state: address.state || "",
        country: address.country || "",
        phoneNumber: address.phoneNumber || "",
        pincode: address.pincode || "",
      });
    }
  }, [address]);

  useEffect(() => {
    if (ordersList) {
      const ordersTotalAmount = ordersList.reduce((sum, order) => {
        return sum + order.quantity * order.price;
      }, 0);
      setTotal(ordersTotalAmount);
      setOrdersList(JSON.parse(sessionStorage.getItem('orders')) || orders_list)

    }
  }, [ordersList]);

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  };

  return (
    <Grid container spacing={2} padding={2}>
         <Snackbar
        open={open}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <SnackbarContent
          message="Order Placed Successfully"
          onClose={handleClose}
          sx={{ backgroundColor: "#99ffbb", color: "#000" }}
          action={action}
        />
      </Snackbar>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSave}
        sx={{
          position: "absolute",
          right: "10%",
          backgroundColor: "orange",
          "&:hover": { backgroundColor: "#fac934" },
        }}
        disabled={ordersList.length === 0}
        size="small"
      >
        Place Order
      </Button>
      <Grid container spacing={2} padding={4}>
        <Grid item xs={12} md={7} order={{ xs: 3, md: 3 }}>
          <Typography variant="h5" gutterBottom>
            Payment Method
          </Typography>

          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={tabValue}
                onChange={handleChanges}
                aria-label="basic tabs example"
              >
                <Tab
                  label="UPI"
                  id="simple-tab-0"
                  aria-controls="simple-tabpanel-0"
                />
                <Tab
                  label="Debit/Credit Card"
                  id="simple-tab-1"
                  aria-controls="simple-tabpanel-1"
                />
                <Tab
                  label="Cash on delivery"
                  id="simple-tab-2"
                  aria-controls="simple-tabpanel-2"
                />
              </Tabs>
            </Box>
            <TabPanel value={tabValue} index={0}>
              <TextField
                fullWidth
                label="Enter the UPI ID"
                variant="outlined"
                name="upiId"
                value={paymentData.upiId}
                onChange={handleCardPayment}
                sx={{ marginBottom: 2, marginTop: 2 }}
                size="small"
              />{" "}
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <TextField
                fullWidth
                label="Card Number"
                variant="outlined"
                name="cardNumber"
                value={paymentData.cardNumber}
                onChange={handleCardPayment}
                sx={{ marginBottom: 2, marginTop: 2 }}
                size="small"
              />{" "}
              <TextField
                fullWidth
                label="CVV"
                variant="outlined"
                name="cvv"
                value={paymentData.cvv}
                onChange={handleCardPayment}
                sx={{ marginBottom: 2, marginTop: 2 }}
                size="small"
              />
              <TextField
                fullWidth
                label="Full Name on Card"
                variant="outlined"
                name="nameOnCard"
                value={paymentData.nameOnCard}
                onChange={handleCardPayment}
                sx={{ marginBottom: 2, marginTop: 2 }}
                size="small"
              />
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              <FormLabel id="cod">
                Would you like to cash on delivery?
              </FormLabel>
              <RadioGroup
                row
                id="cod"
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="cod"
                onChange={(e) =>
                  setPaymentData((prev) => ({
                    ...prev,
                    cashOnDelivery: e.target.value,
                  }))
                }
                value={paymentData.cashOnDelivery}
                className="flex justify-between"
                required
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </TabPanel>
          </Box>
        </Grid>
        <Grid item xs={12} md={5} order={{ xs: 1, md: 1 }}>
          <Typography variant="h5" gutterBottom>
            Order Summary
          </Typography>

          <Grid container>
            <Grid item xs={12}>
              {ordersList?.length > 0 ? (
                ordersList.map(({ productId, quantity, _id }) => (
                  <Card
                    key={_id}
                    variant="outlined"
                    style={{ marginBottom: "16px" }}
                  >
                    <Grid container>
                      <Grid item xs={4} md={4}>
                        <CardMedia
                          component="img"
                          image={productId.imageUrl}
                          alt={productId.name}
                          style={{ height: "150px", objectFit: "contain" }}
                        />
                      </Grid>
                      <Grid item xs={8} md={8}>
                        <CardContent>
                          <Typography variant="h6" fontWeight={"bold"}>
                            {productId.name}
                          </Typography>
                          <Typography variant="body1">
                            Price: {productId.price}
                          </Typography>
                          <Typography variant="body2">
                            Quantity: {quantity}
                          </Typography>
                        </CardContent>
                      </Grid>
                    </Grid>
                  </Card>
                ))
              ) : (
                <Typography>No products found.</Typography>
              )}
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" gutterBottom>
                Total: ${total.toFixed(2)}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} order={{ xs: 2, md: 2 }}>
          <Typography variant="h5" gutterBottom>
            Delivery Address
          </Typography>
          <Divider />
          <TextField
            fullWidth
            label="Street"
            variant="standard"
            name="street"
            value={formData.street}
            onChange={handleChange}
            sx={{ marginBottom: 2, marginTop: 2 }}
            size="small"
          />
          <TextField
            fullWidth
            label="Landmark"
            variant="standard"
            name="landmark"
            value={formData.landmark}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
            size="small"
          />
          <TextField
            fullWidth
            label="City"
            variant="standard"
            name="city"
            value={formData.city}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
            size="small"
          />
          <TextField
            fullWidth
            label="State"
            variant="standard"
            name="state"
            value={formData.state}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
            size="small"
          />
          <TextField
            fullWidth
            label="Country"
            variant="standard"
            name="country"
            value={formData.country}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
            size="small"
          />
          <TextField
            fullWidth
            label="Phone Number"
            variant="standard"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
            size="small"
          />
          <TextField
            fullWidth
            label="Pincode"
            variant="standard"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
            size="small"
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Checkout;
