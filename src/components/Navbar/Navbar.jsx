import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../../redux/slices/userSlices';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Button,
  Box,
  Grid,
  Divider,
  TextField,
} from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(()=>({
  dropdownContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent:'space-between',
  },
  sectionTitle:{
    color: 'rgb(106, 134, 106)',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  }
}))
const Navbar = () => {
  const { email } = useSelector((state) => state.user);
  const products = useSelector(state => state.cart)
  const [searchValue,setSearchValue] = useState(null);
  const [searchBar,setSearchBar] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  
  const [placeholder, setPlaceholder] = useState('Search for medicines, toothpaste...');
  const [anchorElAccount, setAnchorElAccount] = React.useState(null);
  const [anchorElCart, setAnchorElCart] = React.useState(null);
  const [anchorElShop, setAnchorElShop] = React.useState(null);

  const handleAccountClick = (event) => setAnchorElAccount(event.currentTarget);
  const handleAccountClose = () => setAnchorElAccount(null);

  const handleCartClick = (event) => setAnchorElCart(event.currentTarget);
  const handleCartClose = () => setAnchorElCart(null);

  const handleShopClick = (event) => {
    navigate('/products/all')
    setAnchorElShop(event.currentTarget)
  };
  const handleShopClose = () => setAnchorElShop(null);


  const placeholders = [
    'Search for medicines...',
    'Search for toothpaste...',
    'Search for skincare products...',
    'Search for face washers...',
    'Search for soaps...'
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setPlaceholder(placeholders[index]);
      index = (index + 1) % placeholders.length;
    }, 3000); 

    return () => clearInterval(interval);
  }, []);
  return (
    <AppBar position="static" color="default" sx={{ mb: 2,boxShadow:'none' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <img
              src="public\assets\Navbar\himalaya-logo.png"
              alt="Himalaya Logo"
              style={{ width: 150, height: 50 }}
            />
          </Link>
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flrx-start', flexGrow: 1 }}>
        { !searchBar ? 
        <>
         <Button color="inherit" onClick={handleShopClick} sx={{ position: 'relative' }}>
            Shop
          </Button>
          <Menu
            anchorEl={anchorElShop}
            open={Boolean(anchorElShop)}
            onClose={handleShopClose}
            PaperProps={{
              sx: {
                width: '100vw',
                maxWidth: '100vw',
                position:'absolute',
                top:'1000px',
                boxShadow:'none',
              }
            }}
          >
      <Box sx={{ display: 'flex', height: '70vh' }}>
      <Box
        sx={{
          flex: '1 1 50%',
          p: 2,
          overflowY: 'auto',
          scrollbarWidth:'none',
        }}
        className={classes.dropdownContainer}
      >
        <Box sx={{ display: 'flex', flexDirection: 'row',justifyContent:'center',flexWrap:'wrap',gap:'10%',height: '80%' }}>
          <Box sx={{ flex: '1' }}>
            <Typography variant="h6" className={classes.sectionTitle}>Herbal Supplements</Typography>
            <MenuItem component={Link} to="/products/single-herb">Single Herb Supplements</MenuItem>
            <MenuItem component={Link} to="/products/multi-ingredient">Multi-Ingredient Supplements</MenuItem>
          </Box>
          <Box sx={{ flex: '1' }}>
            <Typography variant="h6" className={classes.sectionTitle}>Oral Care</Typography>
            <MenuItem component={Link} to="/products/adult-toothpaste">Adult Toothpaste</MenuItem>
            <MenuItem component={Link} to="/products/kids-toothpaste">Kids Toothpaste</MenuItem>
          </Box>
          <Box sx={{ flex: '1' }}>
            <Typography variant="h6" className={classes.sectionTitle}>Personal Care</Typography>
            <MenuItem component={Link} to="/products/face-care">Face Care</MenuItem>
            <MenuItem component={Link} to="/products/cleansing-bars">Cleansing Bars</MenuItem>
            <MenuItem component={Link} to="/products/balm">Balm</MenuItem>
          </Box>
          <Box sx={{ flex: '1' }}>
            <Typography variant="h6" className={classes.sectionTitle}>Health Interests</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <MenuItem component={Link} to="/products/blood-sugar">Blood Sugar</MenuItem>
                <MenuItem component={Link} to="/products/brain-cognitive">Brain & Cognitive</MenuItem>
                <MenuItem component={Link} to="/products/digestion">Digestion</MenuItem>
              </Grid>
              <Grid item xs={12} sm={6}>
                <MenuItem component={Link} to="/products/energy-vitality">Energy & Vitality</MenuItem>
                <MenuItem component={Link} to="/products/hair-skin-nails">Hair, Skin & Nails</MenuItem>
                <MenuItem component={Link} to="/products/heart-cardio">Heart & Cardio</MenuItem>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          flex: '1',
          display:'flex',
          width:'100%',
          height:'100%',
          backgroundSize:'contain',
          backgroundImage:'url(https://himalayausa.com/cdn/shop/products/chyavanprash-105275_1024x1024.png?v=1660858328)',
          backgroundRepeat:'no-repeat'
        }}
      />
      
    </Box>
          </Menu>
          <Button color="inherit" component={Link} to="/about">About</Button>
          <Button color="inherit">Store Locator</Button> 
          </>
          :
          <TextField
          type='text'
          value={searchValue}
          fullWidth
          size="small"
          placeholder={placeholder}
          onChange={(e)=>{
            setSearchValue(e.target.value)
            if (e.target.value.trim()) {
              navigate(`/products/all?search=${encodeURIComponent(e.target.value)}`);
            }
          }}
          />
          }
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title="Search">
            <IconButton color="inherit" onClick={()=>setSearchBar(prev => !prev)}>
              <SearchOutlinedIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Account">
            <IconButton color="inherit" onClick={handleAccountClick}>
              <PersonOutlineOutlinedIcon />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorElAccount}
            open={Boolean(anchorElAccount)}
            onClose={handleAccountClose}
            PaperProps={{ sx: { width: 200 } }}
          >
            {email ? (
              <>
                <MenuItem onClick={() => dispatch(clearUser())}>Log Out</MenuItem>
                <MenuItem component={Link} to="/account">Account</MenuItem>
              </>
            ) : (
              <>
                <MenuItem component={Link} to="/signin">Sign In</MenuItem>
                <MenuItem component={Link} to="/register">Register</MenuItem>
              </>
            )}
            <MenuItem component={Link} to="#">Checkout</MenuItem>
          </Menu>

          <Tooltip title="Cart">
            <IconButton color="inherit" onClick={handleCartClick}>
              <ShoppingBagIcon />
            </IconButton>
          </Tooltip>
          <Menu
      anchorEl={anchorElCart}
      open={Boolean(anchorElCart)}
      onClose={handleCartClose}
      PaperProps={{ sx: { width: 200 } }}
    >
      {products.slice(0,2).map((product) => (
        <MenuItem key={product.id}>
         <img src={product.imageUrl} width={'20%'} height={'50%'}/> {product.name.slice(0,10)} - {product.count}
        </MenuItem>
      ))}
      <Divider />
      <MenuItem onClick={()=>navigate(`/cart`)}>View Cart</MenuItem>
      <MenuItem>Checkout</MenuItem>
    </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
