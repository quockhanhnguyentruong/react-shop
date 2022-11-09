import axios from "axios";

const singleProductService = {
  getProduct: function (id) {
    return axios
      .get(`https://dummyjson.com/products/${id}`)
      .then(function (response) {
        return response.data;
      });
  },
  getProductQuery: function ({ queryKey }) {
    return axios
      .get(`https://dummyjson.com/products/${queryKey[0]}`)
      .then(function (response) {
        console.log(response.data);
        return response.data;
      });
  },
};

export default singleProductService;
