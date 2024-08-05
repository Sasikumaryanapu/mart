import { Button, Grid, Typography } from "@mui/material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { addToCart } from "../../redux/slices/cartSlice";

const Overview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [details, setDetails] = useState(null);
  const [count, setCount] = useState(0);

  const updateProductCount = async (id, count) => {
    try {
      const response = await axios.put(`http://localhost:3010/products/${id}`, {
        count,
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error updating product count:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:3010/products/${id}`);
      console.log(response.data, "deta");
      setDetails(response.data);
      setCount(response.data.count || 0);
    };
    fetchData();
  }, [id]);

  const handleIncrease = () => {
    setCount((prev) => {
      const newCount = prev + 1;
      updateProductCount(id, newCount);
      return newCount;
    });
  };

  const handleDecrease = () => {
    if (count > 0) {
      setCount((prev) => {
        const newCount = prev - 1;
        updateProductCount(id, newCount);
        return newCount;
      });
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ id, name: details.name, count, price: details.price, imageUrl: details.imageUrl }));
    navigate(`/cart`);
  };

  return (
    <Grid container justifyContent={"space-around"}>
      <Grid item>
        <img src={details?.imageUrl} width={400} height={500} alt="" />
      </Grid>
      {details && (
        <Grid item fontWeight={300} marginTop={6}>
          <Typography variant="h4" sx={{ fontWeight: "900" }}>
            {details.name} <br />
            {details.price}
          </Typography>
          <Grid container item gap={2} marginTop={5}>
            <Button
              variant="contained"
              sx={{
                width: "30%",
                borderRadius: "30px",
                backgroundColor: "#f2f2f0",
                color: "black",
                "&:hover": {
                  backgroundColor: "#f2f2f0",
                },
              }}
              startIcon={<RemoveIcon onClick={handleDecrease} />}
              endIcon={<AddIcon onClick={handleIncrease} />}
            >
              {count}
            </Button>

            <Button
              variant="contained"
              sx={{
                width: "60%",
                height: "50px",
                borderRadius: "30px",
                backgroundColor: "#1A4448",
                "&:hover": {
                  backgroundColor: "#A3B49B",
                },
              }}
              startIcon={<LocalMallIcon />}
              onClick={handleAddToCart}
            >
              Add To Cart
            </Button>
          </Grid>
          <Grid item width={600} sx={{ margin: "5% 0", fontWeight: "300" }}>
            {details.description}
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default Overview;
