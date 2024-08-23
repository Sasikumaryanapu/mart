import React from 'react';
import { Grid, Typography, List, ListItem, ListItemText } from '@mui/material';

const countries = [
  'Delhi',
  'Mumbai',
  'Kolkata',
  'Ahmedabad',
  'Bhubaneswar',
  'Visakhapatnam',
  'Hyderabad',
  'Banglore',
  'Chennai',
  'Thiruvananthapuram',
];

const StoreLocator = () => {
  return (
    <Grid container spacing={3} flexDirection={{ xs: 'column', md: 'row' }} sx={{ padding: 2 }}> 
      <Grid item xs={12} md={4} order={{ xs: 2, md: 2 }}>
        <Typography variant="h6" gutterBottom>
          Available Locations
        </Typography>
        <List>
          {countries.map((country, index) => (
            <ListItem key={index}>
              <ListItemText primary={country} />
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid item xs={12} md={8} container justifyContent="center" alignItems="center" order={{ xs: 1, md: 2 }}>
        <img
          src='/assets/storelocater/inmap.png'
          width="60%"
          height="80%"
          style={{position:'relative',top:'-40px'}}
          alt='Store Locator'
        />
      </Grid>
    </Grid>
  );
};

export default StoreLocator;
