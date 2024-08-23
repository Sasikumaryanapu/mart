import React, { useEffect, useState } from 'react';
import { Grid, Typography, TextField, Button, Divider } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import Axios from '../../api/Api';
import { setAddressData } from '../../redux/slices/userSlices';
const Account = () => {
  const dispatch = useDispatch();
  const { id,name, email, address } = useSelector((state) => state.user);
console.log(address)
  // Local state to manage editable address fields
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    street: address.street || '',
    landmark: address.landmark || '',
    city: address.city || '',
    state: address.state || '',
    country: address.country || '',
    phoneNumber: address.phoneNumber || '',
    pincode: address.pincode || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSave = async () => {
    try{
      await Axios.put(`/user/${id}`,formData)
      dispatch(setAddressData(formData));
    }
    catch(err){
      console.log(err)
    }
    setIsEditing(false);
  };

  useEffect(() => {
    if (address) {
      setFormData({
        street: address.street || '',
        landmark: address.landmark || '',
        city: address.city || '',
        state: address.state || '',
        country: address.country || '',
        phoneNumber: address.phoneNumber || '',
        pincode: address.pincode || ''
      });
    }
  }, [address]);
  return (
    <Grid container spacing={3} sx={{ padding: 2 }} justifyContent="center">
      <Grid item xs={12}>
        <Typography variant="h4" textAlign="center" gutterBottom>
          My Account
        </Typography>
      </Grid>

      <Grid item xs={12} md={8}>
        <Typography variant="body1" gutterBottom>
          <strong>Name:</strong> {name}
        </Typography>

        <Typography variant="body1" gutterBottom marginBottom={4}>
          <strong>Email:</strong> {email}
        </Typography>
        <Divider />
        <Typography variant="h5" gutterBottom marginTop={2}>
          Address
        </Typography>

        {isEditing ? (
          <>
            <TextField
              fullWidth
              label="Street"
              variant="outlined"
              name="street"
              value={formData.street}
              onChange={handleChange}
              sx={{ marginBottom: 2,marginTop:2 }}
              size='small'
            />
            <TextField
              fullWidth
              label="Landmark"
              variant="outlined"
              name="landmark"
              value={formData.landmark}
              onChange={handleChange}
              sx={{ marginBottom: 2 }}
              size='small'
            />
            <TextField
              fullWidth
              label="City"
              variant="outlined"
              name="city"
              value={formData.city}
              onChange={handleChange}
              sx={{ marginBottom: 2 }}
              size='small'
            />
            <TextField
              fullWidth
              label="State"
              variant="outlined"
              name="state"
              value={formData.state}
              onChange={handleChange}
              sx={{ marginBottom: 2 }}
              size='small'
            />
            <TextField
              fullWidth
              label="Country"
              variant="outlined"
              name="country"
              value={formData.country}
              onChange={handleChange}
              sx={{ marginBottom: 2 }}
              size='small'
            />
            <TextField
              fullWidth
              label="Phone Number"
              variant="outlined"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              sx={{ marginBottom: 2 }}
              size='small'
            />
            <TextField
              fullWidth
              label="Pincode"
              variant="outlined"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              sx={{ marginBottom: 2 }}
              size='small'
            />

            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              sx={{ marginRight: 2 }}
              size='small'
            >
              Save Changes
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setIsEditing(false)}
              size='small'
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Typography variant="body1" gutterBottom>
              <strong>Street:</strong> {formData.street || 'N/A'}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Landmark:</strong> {formData.landmark || 'N/A'}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>City:</strong> {formData.city || 'N/A'}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>State:</strong> {formData.state || 'N/A'}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Country:</strong> {formData.country || 'N/A'}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Phone Number:</strong> {formData.phoneNumber || 'N/A'}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Pincode:</strong> {formData.pincode || 'N/A'}
            </Typography>

            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsEditing(true)}
            >
              Edit Address
            </Button>
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default Account;
