import axios from 'axios';

const Axios = axios.create({
  baseURL: 'http://localhost:5000',
});

// Request Interceptor
Axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response Interceptor
Axios.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const { response } = error;
    if (response && response.status === 401) {
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const result = await Axios.post('/user/refresh-token', { refreshToken });
        
        localStorage.setItem('accessToken', result.data.accessToken);
        localStorage.setItem('refreshToken', result.data.refreshToken);

        const originalRequest = response.config;
        originalRequest.headers['Authorization'] = `Bearer ${result.data.accessToken}`;
        return Axios(originalRequest);
      } catch (refreshError) {
        window.location.href = '/signin';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default Axios;
