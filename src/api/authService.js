import Axios from "./Api";


// Function to refresh tokens
const refreshToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    console.log('No refresh token found');
    return null;
  }

  try {
    const response = await Axios.post(`/refresh-token`, { refreshToken });
    const { accessToken, refreshToken: newRefreshToken } = response.data;
    localStorage.setItem('accessToken', accessToken); 
    if (newRefreshToken) {
      localStorage.setItem('refreshToken', newRefreshToken);
    }
    return accessToken;
  } catch (error) {
    console.error('Error refreshing token:', error);
    return null;
  }
};

// Function to check authentication and fetch user data
export const checkAuthentication = async () => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    try {
      const response = await Axios.get('/user/verify-token', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (response.status === 200) {
        const userResponse = await Axios.get('/user/user-profile', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        return { isAuthenticated: true, user: userResponse.data };
      } else if (response.status === 401) {
        const newAccessToken = await refreshToken();
        if (newAccessToken) {
          const userResponse = await Axios.get('/user/user-profile', {
            headers: {
              'Authorization': `Bearer ${newAccessToken}`
            }
          });
          return { isAuthenticated: true, user: userResponse.data };
        }
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
    }
  }

  return { isAuthenticated: false, user: null };
};
