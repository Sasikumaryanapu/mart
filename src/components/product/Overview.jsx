import {
  Button,
  Grid,
  IconButton,
  Snackbar,
  SnackbarContent,
  Typography,
} from "@mui/material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import Axios from "../../api/Api.js";
import CloseIcon from "@mui/icons-material/Close";
const Overview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [details, setDetails] = useState(null);
  const [count, setCount] = useState(1);

  const { id: userId, email } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  // const updateProductCount = async (id, count) => {
  //   try {
  //     const response = await Axios.put(`/products/${id}`, {
  //       count,
  //     });
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error('Error updating product count:', error);
  //   }
  // };

  useEffect(() => {
    const fetchData = async () => {
      const response = await Axios.get(`/products/${id}`);
      console.log(response.data, "deta");
      setDetails(response.data);
      setCount(response.data.count || 0);
    };
    fetchData();
  }, [id]);

  const handleQuantityChange = async (id, newQuantity) => {
    const { _id: product_id, price } = details;
    const numericValue = parseFloat(price.replace(/[$,]/g, ""));
    const payload = {
      userId,
      items: [
        {
          productId: product_id,
          quantity: count,
          price: numericValue,
        },
      ],
      total: numericValue,
    };
    try {
      setCount(newQuantity);
      await Axios.post(`/cart`, payload);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleAddToCart = async () => {
    const { _id: productId, price } = details;
    const numericValue = parseFloat(price.replace(/[$,]/g, ""));

    const payload = {
      userId,
      items: [
        {
          productId,
          quantity: count,
          price: numericValue,
        },
      ],
      total: numericValue,
    };
    try {
      const response = await Axios.post("/cart", payload);
      dispatch(
        addToCart({
          id,
          name: details.name,
          count,
          price: details.price,
          imageUrl: details.imageUrl,
        })
      );
      navigate(`/cart`);
    } catch (err) {
      console.log(err);
      if(!userId){
        handleClick();
      }
    }
  };

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
  return (
    <Grid container spacing={2} padding={2} direction="row" alignItems="center">
      <Grid item xs={12} md={6}>
        <img
          src={details?.imageUrl}
          alt=""
          style={{ width: "100%", maxWidth: "400px", height: "auto" }}
        />
      </Grid>
      {details && (
        <Grid item xs={12} md={6}>
          <Typography
            variant="h4"
            sx={{ fontWeight: "900", textAlign: "left" }}
          >
            {details.name}
          </Typography>
          <Typography variant="h4">{details.price}</Typography>
          <Grid container spacing={2} justifyContent="flex-start" marginTop={2}>
            <Grid item>
              <Button
                variant="contained"
                sx={{
                  borderRadius: "30px",
                  backgroundColor: "#f2f2f0",
                  color: "black",
                  "&:hover": {
                    backgroundColor: "#e0e0e0",
                  },
                  minWidth: "120px",
                  height: "50px",
                }}
                startIcon={
                  <RemoveIcon
                    onClick={() => handleQuantityChange(details._id, count - 1)}
                  />
                }
                endIcon={
                  <AddIcon
                    onClick={() => handleQuantityChange(details._id, count + 1)}
                  />
                }
              >
                {count}
              </Button>
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                sx={{
                  height: "50px",
                  borderRadius: "30px",
                  backgroundColor: "#1A4448",
                  "&:hover": {
                    backgroundColor: "#A3B49B",
                  },
                  minWidth: "200px",
                }}
                startIcon={<LocalMallIcon />}
                onClick={handleAddToCart}
              >
                Add To Cart
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ marginTop: 2 }}>
            <Typography variant="body1" sx={{ textAlign: "left" }}>
              {details.description}
            </Typography>
          </Grid>
        </Grid>
      )}
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <SnackbarContent
          message={
            <>
              Please{" "}
              <Link style={{ color: "#000" }} to="/signin">
                Log In
              </Link>{" "}
              to Shop
            </>
          }
          onClose={handleClose}
          sx={{ backgroundColor: "white", color: "#000" }}
          action={action}
        />
      </Snackbar>
    </Grid>
  );
};

export default Overview;
