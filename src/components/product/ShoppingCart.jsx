import React, { useEffect, useState } from "react";
import { Box, Button, colors, Grid, Typography } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { Link, useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { useSelector, useDispatch } from "react-redux";
import {
  removeProduct,
  updateProductCount,
} from "../../redux/slices/cartSlice";
import Axios from "../../api/Api";
import { addToOrder } from "../../redux/slices/orderSlice";

const useStyles = makeStyles(() => ({
  card: {
    fontWeight: "900",
    fontSize: "small",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "10px",
    "@media (max-width:600px)": {
      flexDirection: "column",
      textAlign: "center",
    },
  },
  price: {
    color: "#A3B49B",
  },
  anchor: {
    color: "#1A4448",
    fontSize: "larger",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  cardItem: {
    position: "relative",
    top: "1rem",
    textAlign: "center",
    borderBottom: "1px solid #ddd",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    padding: "10px",
    "@media (max-width:600px)": {
      padding: "10px",
    },
  },
  button: {
    width: "150px",
    height: "40px",
    borderRadius: "20px",
    backgroundColor: "#f2f2f0",
    color: "black",
    "&:hover": {
      backgroundColor: "#e0e0e0",
    },
    "@media (max-width:600px)": {
      width: "120px",
      height: "35px",
    },
  },
  totalBox: {
    backgroundColor: "#1A4448",
    color: "white",
    borderRadius: "8px",
    padding: "10px 20px",
    textAlign: "center",
    marginTop: "20px",
    width: "100%",
    maxWidth: "400px",
    "& b": {
      fontSize: "larger",
    },
  },
  emptyMessage: {
    textAlign: "center",
    padding: "20px",
    color: "#555",
  },
}));

const ShoppingCart = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, email } = useSelector((state) => state.user);

  const [products, setProducts] = useState(null);

  const fetchCartItems = async (userId) => {
    const response = await Axios.get(`/cart/${userId}`);
    setProducts(response.data.items);
  };

  useEffect(() => {
    fetchCartItems(id);
  }, [id]);

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity == 0) {
      handleRemove(productId);
      return;
    }

    try {
      const updatedItems = products.map((item) =>
        item.productId._id === productId
          ? { ...item, quantity: newQuantity }
          : item
      );
      setProducts(updatedItems);

      const total = updatedItems
        .reduce((total, product) => {
          return total + product.price * product.quantity;
        }, 0)
        .toFixed(2);

      await Axios.put(`/cart/${id}`, {
        userId: id,
        productId,
        quantity: newQuantity,
        total,
      });
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleRemove = async (productId) => {
    // dispatch(removeProduct(productId));
    try {
      const response = await Axios.delete(`/cart/${id}/${productId}`);
      console.log(response.data.items, "del");
      setProducts(response.data.items);
    } catch (err) {
      console.log(err);
    }
  };

  const calculateTotal = () => {
    return products
      ?.reduce((total, product) => {
        return total + product.price * product.quantity;
      }, 0)
      .toFixed(2);
  };

  const handleOrder = async (product) => {
    await dispatch(addToOrder(product));

    if(JSON.parse(sessionStorage.getItem('orders')))
    {

      const orders_list = JSON.parse(sessionStorage.getItem('orders'))
      sessionStorage.setItem('orders', JSON.stringify([product,...orders_list]));
    }

    navigate("/checkout");
  };
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      padding={2}
      spacing={2}
    >
      <Typography variant="h4">Shopping Cart</Typography>
      <Grid
        container
        xs={12}
        spacing={2}
        justifyContent="center"
        padding={2}
        gap={2}
      >
        {products?.length > 0 ? (
          products
            .filter((product) => product.quantity >= 1)
            .map((product) => (
              <Grid
                item
                key={product.id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                className={classes.cardItem}
              >
                <DeleteOutlineIcon
                  style={{
                    cursor: "pointer",
                    color: "red",
                    position: "absolute",
                    top: "0",
                    right: "0",
                  }}
                  onClick={() => handleRemove(product.productId._id)}
                />
                <img
                  src={product?.productId.imageUrl}
                  width={100}
                  height={100}
                  alt={product?.name}
                />
                <Typography variant="h6">{product?.productId.name}</Typography>
                <Typography variant="h6" className={classes.price}>
                  ${product.price}
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={
                    <RemoveIcon
                      onClick={() =>
                        handleQuantityChange(
                          product.productId._id,
                          product.quantity - 1
                        )
                      }
                    />
                  }
                  endIcon={
                    <AddIcon
                      onClick={() =>
                        handleQuantityChange(
                          product.productId._id,
                          product.quantity + 1
                        )
                      }
                    />
                  }
                >
                  {product.quantity}
                </Button>
                &nbsp;
                <Button
                  variant="contained"
                  onClick={() => handleOrder(product)}
                  sx={{
                    backgroundColor: "orange",
                    "&:hover": { backgroundColor: "#fac934" },
                  }}
                >
                  Order
                </Button>
              </Grid>
            ))
        ) : (
          <Typography className={classes.emptyMessage}>
            No products in the cart. Discover the benefits of our top
            products—add your favorites to the cart and start experiencing the
            difference today!
          </Typography>
        )}
      </Grid>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        padding={2}
      >
        <Link to="/products/all" className={classes.anchor}>
          Continue Shopping
        </Link>
        <Box className={classes.totalBox}>
          <Typography variant="h6">
            Grand Total:
            <b>${calculateTotal()}</b>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ShoppingCart;
