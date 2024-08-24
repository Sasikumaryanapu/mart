import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
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
  Drawer,
  List,
  ListItem,
  ListItemText,
  Collapse,
} from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { makeStyles, styled } from '@mui/styles';

const useStyles = makeStyles(() => ({
  dropdownContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    color: 'rgb(106, 134, 106)',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  },
  drawerPaper: {
    width: 240,
  },
}));

const StyledLink = styled(Link)(() => ({
  width: '100%',
  height: '50vh',
  fontSize: 'larger',
  cursor: 'pointer',
  textDecoration: 'none',
  color: 'black',
  padding: '1rem',
}));

const Navbar = () => {
  const { email } = useSelector((state) => state.user);
  const products = useSelector((state) => state.cart);
  const [searchValue, setSearchValue] = useState('');
  const [searchBar, setSearchBar] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [shopMenuOpen, setShopMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const classes = useStyles();

  const [placeholder, setPlaceholder] = useState('Search for medicines, toothpaste...');
  const [anchorElAccount, setAnchorElAccount] = React.useState(null);
  const [anchorElCart, setAnchorElCart] = React.useState(null);

  const handleAccountClick = (event) => setAnchorElAccount(event.currentTarget);
  const handleAccountClose = () => setAnchorElAccount(null);

  const handleCartClick = (event) => setAnchorElCart(event.currentTarget);
  const handleCartClose = () => setAnchorElCart(null);

  const handleDrawerOpen = () => setDrawerOpen(true);
  const handleDrawerClose = () => setDrawerOpen(false);

  const handleShopMenuToggle = () => setShopMenuOpen((prev) => !prev);

  const placeholders = [
    'Search for medicines...',
    'Search for toothpaste...',
    'Search for skincare products...',
    'Search for face washers...',
    'Search for soaps...',
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setPlaceholder(placeholders[index]);
      index = (index + 1) % placeholders.length;
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const generateBreadcrumbs = () => {
    const pathnames = location.pathname.split('/').filter((x) => x);
    return pathnames.map((value, index) => {
      const to = `/${pathnames.slice(0, index + 1).join('/')}`;
      return (
        <Link key={to} to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </Link>
      );
    });
  };

  return (
    <AppBar position="static" color="default" sx={{ mb: 2, boxShadow: 'none' }}>
      <Toolbar sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2, display: { xs: 'block', md: 'none' } }}
          onClick={handleDrawerOpen}
        >
          <MenuIcon />
        </IconButton>

        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={handleDrawerClose}
          PaperProps={{ sx: { width: 240 } }}
        >
          <Box sx={{ width: 240 }}>
            <List>
            <ListItem>
                <TextField
                  type='text'
                  value={searchValue}
                  fullWidth
                  size="small"
                  placeholder={placeholder}
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                    if (e.target.value.trim()) {
                      navigate(`/products/all?search=${encodeURIComponent(e.target.value)}`);
                    }
                  }}
                />
              </ListItem>
              <ListItem button component={Link} to="/" onClick={handleDrawerClose}>
                <ListItemText primary="Home" />
              </ListItem>
              <ListItem button component={Link} to="/about" onClick={handleDrawerClose}>
                <ListItemText primary="About" />
              </ListItem>
              <ListItem button onClick={handleShopMenuToggle}>
                <ListItemText primary="Shop" />
                {shopMenuOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={shopMenuOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem button component={Link} to="/products/herbal-supplements" onClick={handleDrawerClose}>
                    <ListItemText primary="Herbal Supplements" />
                  </ListItem>
                  <ListItem button component={Link} to="/products/health-interests" onClick={handleDrawerClose}>
                    <ListItemText primary="Health Interests" />
                  </ListItem>
                  <ListItem button component={Link} to="/products/oral-care" onClick={handleDrawerClose}>
                    <ListItemText primary="Oral Care" />
                  </ListItem>
                  <ListItem button component={Link} to="/products/personal-care" onClick={handleDrawerClose}>
                    <ListItemText primary="Personal Care" />
                  </ListItem>
                </List>
              </Collapse>
              {email ? (
                <>
                  <ListItem button onClick={() => { dispatch(clearUser()); localStorage.clear(); handleDrawerClose(); }}>
                    <ListItemText primary="Log Out" />
                  </ListItem>
                  <ListItem button component={Link} to="/account" onClick={handleDrawerClose}>
                    <ListItemText primary="Account" />
                  </ListItem>
                </>
              ) : (
                <>
                  <ListItem button component={Link} to="/signin" onClick={handleDrawerClose}>
                    <ListItemText primary="Sign In" />
                  </ListItem>
                  <ListItem button component={Link} to="/register" onClick={handleDrawerClose}>
                    <ListItemText primary="Register" />
                  </ListItem>
                </>
              )}
              <ListItem button component={Link} to="/cart" onClick={handleDrawerClose}>
                <ListItemText primary="Cart" />
              </ListItem>
              <ListItem button component={Link} to="/checkout" onClick={handleDrawerClose}>
                <ListItemText primary="Checkout" />
              </ListItem>
            </List>
          </Box>
        </Drawer>
        <Box marginRight={40} sx={{ display: { xs: 'none', md: 'block' } }} >
        <StyledLink to='/'>Home</StyledLink>
        <StyledLink to='/products/all'>Shop</StyledLink>
        <StyledLink to='/store-locater'>Store Locator</StyledLink>
       </Box>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', flexGrow: 1 }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {/* <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <img
                src="/assets/Navbar/himalaya-logo.png"
                alt="Himalaya Logo"
                style={{ width: '20vw', height: '8vh' }}
              />
            </Link> */}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', }}>
      
           { searchBar && <TextField
              type='text'
              value={searchValue}
              size="small"
              placeholder={placeholder}
              onChange={(e) => {
                setSearchValue(e.target.value);
                if (e.target.value.trim()) {
                  navigate(`/products/all?search=${encodeURIComponent(e.target.value)}`);
                }
              }}
              sx={{ display: { xs: 'none', md: 'block' }, width: 300, mr: 2 }}
            />}

            <Tooltip title="Search">
              <IconButton color="inherit" onClick={() => setSearchBar((prev) => !prev)} xs={'none'} md={'block'}>
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
                  <MenuItem onClick={() => { dispatch(clearUser()); localStorage.clear(); }}>Log Out</MenuItem>
                  <MenuItem component={Link} to="/account">Account</MenuItem>
                </>
              ) : (
                <>
                  <MenuItem component={Link} to="/signin">Sign In</MenuItem>
                  <MenuItem component={Link} to="/register">Register</MenuItem>
                </>
              )}
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
              {products.slice(0, 2).map((product) => (
                <MenuItem key={product.id}>
                  <img src={product.imageUrl} width={'20%'} height={'50%'} alt={product.name} /> {product.name.slice(0, 10)} - {product.count}
                </MenuItem>
              ))}
              <Divider />
              <MenuItem onClick={() => navigate(`/cart`)}>View Cart</MenuItem>
              <MenuItem onClick={() => navigate(`/checkout`)}>Checkout</MenuItem>
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
