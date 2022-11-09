import axios from "axios";

const productService = {
  getProductList: function () {
    return axios
      .get("https://dummyjson.com/products")
      .then(function (response) {
        return response.data;
      });
  },
};

export default productService;
