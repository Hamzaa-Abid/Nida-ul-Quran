import axios from "axios";
import { toast } from "react-toastify";

// const instance = axios.create({
//   baseURL: "https://qtutor.azurewebsites.net/",
// });

const instance = axios.create({
  baseURL: "http://localhost:5500/",
});

// Add a request interceptor
instance.interceptors.request.use(
  config => {
      const token = localStorage.getItem("token");
      const myToken = JSON.parse(token);
      if (token) {
          config.headers['authorization'] = myToken;
      }
      // config.headers['Content-Type'] = 'application/json';
      return config;
  },
  error => {
      Promise.reject(error)
  });

  instance.interceptors.response.use(null, error => {
    console.log(error.response.data.auth)
    
    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;
  
    if (!expectedError) {
      console.log('unexpected error occured');
    }

    if(error.response.data.auth == false) {
      console.log('jwt token authentication failed')
      //logout user here
      localStorage.clear();
      window.location.href(window.location.origin)
    }
  
    return Promise.reject(error);
  });

export default instance;
