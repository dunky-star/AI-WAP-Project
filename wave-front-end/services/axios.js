const axios = require('axios');
const { getToken, saveToken } = require('./authStorage');

const baseURI = process.env.URL || 'http://localhost:3000/';


const axiosInstance = axios.create({
    });

// Request interceptor (optional)
axiosInstance.interceptors.request.use(
    (config) => {
        // Do something before the request is sent
        // Example: Add authorization token
        console.log('Axios interceptor:', getToken());

        const authToken = getToken()
        if (authToken)
            config.headers.Authorization = `Bearer ${authToken}`;

        return config;
    },
    (error) => {
       
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        // Do something with successful responses
        // Example: Handle common error codes

        const {data} = response;

        if(data && data.status === 'success'){

            if(data.data.token){
                console.log('Token exist:', data.data.token)
                saveToken(data.data.token);
            }

        }

        if (response.status >= 400) {
            console.warn('API response error:', response.statusText);
        }
        return response;
    },
    (error) => {
        // Do something with response errors
        console.error('Response error:', error);
        return Promise.reject(error);
    }
);

module.exports = axiosInstance;