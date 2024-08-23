import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { Box, Typography, TextField, InputAdornment, IconButton } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import CloseIcon from '@mui/icons-material/Close';
import YouTubeIcon from '@mui/icons-material/YouTube';
import axios from 'axios';
import Axios from '../../api/Api.js';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    padding: '40px 100px',
    backgroundColor: '#f0f2ef',
    [theme.breakpoints.down('md')]: {
      padding: '20px',
    },
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  link: {
    textDecoration: 'none',
    fontSize: 'medium',
    color: 'rgb(156, 157, 156)',
  },
  contactText: {
    fontWeight: 800,
    color: 'rgb(142, 164, 142)',
  },
  socialIcons: {
    display: 'flex',
    gap: '10px',
    marginTop: '10px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  },
  disclaimer: {
    backgroundColor: '#f0f2ef',
    padding: '20px',
    textAlign: 'center',
    borderTop: '1px solid #ddd',
  },
  copyRight: {
    margin: '0 auto',
    paddingBottom: '10px',
    color: 'rgb(156, 157, 156)',
  },
  warning: {
    border: '1px solid black',
    fontSize: 'small',
    fontWeight: 400,
  },
}));

const Footer = () => {
  const classes = useStyles();
  const { email } = useSelector((state) => state.user);
  const [mail, setMail] = useState(email);

  const navLinks = [
    { name: 'Contact Us', path: '#' },
    { name: 'FAQ', path: '#' },
    { name: 'Blog', path: '#' },
    { name: 'Store Locator', path: '#' },
    { name: 'Careers', path: '#' },
    { name: 'Shipping & Returns', path: '#' },
    { name: 'Terms & Conditions', path: '#' },
    { name: 'Privacy', path: '#' },
    { name: 'CCPA', path: '#' },
    { name: 'Accessibility', path: '#' },
  ];

  const sendEmail = (e) => {
    e.preventDefault();

    Axios.post(`/user/send-email`, { email: mail })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <>
      <Box className={classes.container}>
        <Box className={classes.section}>
          <Typography variant="h6">Info</Typography>
          {navLinks.slice(0, 5).map((link, index) => (
            <Link key={index} to={link.path} className={classes.link}>
              <Typography variant="body2">{link.name}</Typography>
            </Link>
          ))}
        </Box>
        <Box className={classes.section}>
          <Typography variant="h6">Policies</Typography>
          {navLinks.slice(5).map((link, index) => (
            <Link key={index} to={link.path} className={classes.link}>
              <Typography variant="body2">{link.name}</Typography>
            </Link>
          ))}
        </Box>
        <Box className={classes.section}>
          <Typography variant="h6">Contact Us</Typography>
          <Typography variant="subtitle1">Email</Typography>
          <Typography variant="body2" className={classes.contactText}>
            writetous@himalayausa.com
          </Typography>
          <Typography variant="subtitle1">Phone</Typography>
          <Typography variant="body2">098-982-07989</Typography>
          <Typography variant="body2">Mon-Fri, 8am-5pm CT</Typography>
          <Typography variant="subtitle1">Mail</Typography>
          <Typography variant="body2">
            Himalaya Wellness <br />
            1101 Gillingham Lane <br />
            Sugar Land, TX 77478​
          </Typography>
        </Box>
        <Box className={classes.section}>
          <Typography variant="h6">Subscribe to Our Newsletter!</Typography>
          <TextField
            type="text"
            size="small"
            placeholder="Enter your mail"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={sendEmail}>
                    <MailIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Typography variant="body2">
            By entering your email, you <br />
            agree to our Terms & Conditions <br /> and Privacy Policy.
          </Typography>
          <Typography variant="h6">
            Follow Us:
            <Box className={classes.socialIcons}>
              <FacebookIcon />
              <InstagramIcon />
              <CloseIcon />
              <YouTubeIcon />
            </Box>
          </Typography>
        </Box>
      </Box>

      <Box className={classes.disclaimer}>
        <Typography variant="body2" className={classes.copyRight}>
          © 2022 Himalaya Wellness. All rights reserved.
        </Typography>
        <Typography variant="body2" className={classes.warning}>
          *THESE STATEMENTS HAVE NOT BEEN EVALUATED BY THE FOOD AND DRUG ADMINISTRATION. THIS PRODUCT IS NOT INTENDED TO DIAGNOSE, TREAT, CURE OR PREVENT ANY DISEASE.
        </Typography>
      </Box>
    </>
  );
};

export default Footer;
