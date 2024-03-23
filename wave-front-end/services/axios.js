const axios = require('axios');


const axiosInstance = axios.create({
    });

// Request interceptor 
axiosInstance.interceptors.request.use(
    (config) => {
     
        // Add authorization token before the request is sent
        console.log('config: ', config)

        const {data}= config;
        const authToken = JSON.parse(data).token;

        console.log('Token:', authToken)

        if (authToken){
            config.headers.Authorization = `Bearer ${authToken}`;
        }

        return config;
    },
    (error) => {
       
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);


module.exports = axiosInstance;