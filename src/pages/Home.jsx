/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Product from "../components/Product";
import sagaActions from "../redux/sagaActions";

const Home = () => {
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch({
      type: sagaActions.FETCH_PRODUCTS,
    });
  }, []);

  return (
    <>
      <div className="min-h-[80vh] grid sm:grid-cols-2 md:grid-cols-3 space-x-5 space-y-10 lg:grid-cols-4 max-w-6xl mx-auto p-2 ">
        {productList.map((item) => {
          return <Product key={item.id} item={item} />;
        })}
      </div>
    </>
  );
};

export default Home;
