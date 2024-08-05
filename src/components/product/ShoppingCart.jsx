import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Typography } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { useSelector, useDispatch } from "react-redux";
import { removeProduct, updateProductCount } from '../../redux/slices/cartSlice';

const useStyles = makeStyles(() => ({
  card: {
    fontWeight: "900",
    fontSize: 'small',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '10px',
  },
  price: {
    color: "#A3B49B",
  },
  anchor: {
    color: "black",
    fontSize:'larger'
  },
  cardItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent:'space-evenly',
    alignItems: 'center',
    textAlign: 'center',
    borderBottom: "0.1px solid #777777",
  },
}));

const ShoppingCart = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const products = useSelector(state => state.cart);

  const [counts, setCounts] = useState({});

  useEffect(() => {
    const initialCounts = {};
    products.forEach(product => {
      initialCounts[product.id] = product.count;
    }); 
    setCounts(initialCounts);
  }, [products]);

  const handleIncrease = (productId) => {
    setCounts((prevCounts) => {
      const newCount = (prevCounts[productId] || 0) + 1;
      dispatch(updateProductCount({id:productId, count:newCount}));
      return { ...prevCounts, [productId]: newCount };
    });
  };

  const handleDecrease = (productId) => {
    setCounts((prevCounts) => {
      const currentCount = prevCounts[productId] || 0;
      if (currentCount > 0) {
        const newCount = currentCount - 1;
        dispatch(updateProductCount({id:productId, count:newCount}));
        return { ...prevCounts, [productId]: newCount };
      }
      return prevCounts;
    });
  };

  const handleRemove = (productId) => {
    dispatch(removeProduct(productId));
    setCounts((prevCounts) => {
      const updatedCounts = { ...prevCounts };
      delete updatedCounts[productId];
      return updatedCounts;
    });
  };

  const calculateTotal = () => {
    return products.reduce((total, product) => {
      const productCount = counts[product.id] || product.count;
      return total + parseFloat(product.price.slice(1)) * productCount;
    }, 0).toFixed(2);
  };

  return (
    <Grid
      container
      display={"flex"}
      justifyContent={"center"}
      alignItems={'center'}
      width={"100%"}
      paddingX={10}
      gap={10}
    >
      <Typography variant="h6" sx={{ width: '100%', textAlign: 'center', marginBottom: 2 }}>
        Shopping Cart
      </Typography>
      <Grid
        container
        spacing={2}
        justifyContent={"center"}
        className={classes.card}
      >
        {products.length >0 ? products.map(product => (
          <Grid item key={product.id} xs={12} sm={6} md={12} lg={12} className={classes.cardItem}>
            <DeleteOutlineIcon 
              style={{ cursor: 'pointer', color: 'red' }} 
              onClick={() => handleRemove(product.id)} 
            />
            <img 
              src={product?.imageUrl} 
              width={100} 
              height={100} 
              alt={product?.name} 
              style={{ display: 'block', marginBottom: '10px' }}
            />
            <Typography variant="h6">{product?.name}</Typography>
            <Typography variant="h6" className={classes.price}>
              {product?.price}
            </Typography>
            <Button
              variant="contained"
              sx={{
                width: "200px",
                height: '40px',
                borderRadius: "30px",
                backgroundColor: "#f2f2f0",
                color: "black",
                "&:hover": {
                  backgroundColor: "#f2f2f0",
                },
              }}
              startIcon={<RemoveIcon onClick={() => handleDecrease(product.id)} />}
              endIcon={<AddIcon onClick={() => handleIncrease(product.id)} />}
            >
              {counts[product.id] || product.count}
            </Button>
            <Typography variant="h6" className={classes.price}>
              ${(parseFloat(product?.price.slice(1) || 0) * (counts[product.id] || product.count)).toFixed(2)}
            </Typography>
          </Grid>
        )): <Typography>Discover the benefits of our top products—add your favorites to the cart and start experiencing the difference today!</Typography>}
      </Grid>
      <Grid container item justifyContent={"space-between"} paddingBottom={4}>
        <Link to="/" className={classes.anchor}>
          continue shopping
        </Link>
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{
            color: "white",
            width: "auto",
            paddingX:'10px',
            height: "12vh ",
            backgroundColor: "#A3B49B",
            borderRadius: '8px',
            '& b':{
              fontSize:'larger',
              fontWeight:'600'
            }
          }}
        >
          <Typography variant="h4">
           Grand Total: 
           <b>
           ${calculateTotal()}
            </b> 
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ShoppingCart;
