import { Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const Account = () => {
  const { name, email } = useSelector((state) => state.user);
  return (
    <Grid container flexDirection={"column"} sx={{ margin: "20px 10px" }}>
      <Typography variant="h4" textAlign={"center"}>
        My Account
      </Typography>

      <Grid
        container
        flexDirection={"column"}
        width={"80%"}
        justifyContent={"center"}
        marginTop={5}
        marginLeft={20}
        item
        gap={1}
      >
        <Typography variant="h6">Account Details</Typography>
        <br></br>
        <Typography> Name :&nbsp;{name}</Typography>
        <Typography> Email :&nbsp;{email}</Typography>
      </Grid>
    </Grid>
  );
};

export default Account;
