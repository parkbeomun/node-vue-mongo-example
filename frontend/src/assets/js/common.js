import axios from "axios";

module.exports = {

  setAxiosInterceptors: function(tokenType, accessToken) {
    axios.interceptors.request.use(function (config) {

      config.headers.Authorization = tokenType + " " + accessToken
      return config;
    }, function (error) {
      // Do something with request error
      return Promise.reject(error);
    });
    // Add a response interceptor
    axios.interceptors.response.use(function (response) {
      // Do something with response data
      return response;
    }, function (error) {
      // Do something with response error
      return Promise.reject(error);
    });
  }
}

