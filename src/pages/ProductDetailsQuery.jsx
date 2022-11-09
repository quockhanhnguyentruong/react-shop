/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  add,
  addToTotal,
  subtractFromTotal,
  subtractQuantity,
} from "../redux/Slices/cartSlice";
import { useSnackbar } from "notistack";
import SimpleImageSlider from "react-simple-image-slider";
import { useParams } from "react-router";
import styled from "styled-components";
import ProductDescription from "../components/ProductDescription";
import useConfirm from "../hooks/useConfirm";
import { useQuery } from "react-query";
import singleProductService from "../services/singleProductService";

const PRIMARY_COLOR = "rgb(126, 34, 206, 1)";

const StyledButton = styled.div`
  transition-duration: 300ms;
  font-weight: 600;
  padding: 0.75rem;
  transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
  border-radius: 0.5rem;
  border-width: 2px;
  border-color: ${PRIMARY_COLOR};
  color: ${PRIMARY_COLOR};
  opacity: 1;
  cursor: pointer;
  &:hover {
    background-color: ${PRIMARY_COLOR};
    color: white;
  }
`;

const ProductDetails = () => {
  const { id } = useParams();
  const { confirm } = useConfirm();
  const { currentCart } = useSelector((state) => state.cart);
  const [product, setProduct] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useQuery({
    queryKey: id,
    queryFn: singleProductService.getProductQuery,
  });

  useEffect(() => {
    if (data) {
      setProduct(data);
    }
  }, [data]);

  const addToCart = () => {
    dispatch(add(product));
    dispatch(addToTotal(product.price));
    enqueueSnackbar(`${product.title} added to your cart successfully`, {
      variant: "success",
      autoHideDuration: 1000,
    });
  };

  const removeFromCart = async () => {
    const isConfirm = await confirm("Do you confirm your choice?");
    if (isConfirm) {
      dispatch(subtractQuantity(product.id));
      dispatch(subtractFromTotal(product.price));
      enqueueSnackbar(`${product.title} removed from your cart!`, {
        variant: "warning",
        autoHideDuration: 1000,
      });
    }
    return;
  };

  return (
    <>
      {isLoading && <p>isLoading...</p>}
      {isError && <p>isError...</p>}
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
              {product && product.images && (
                <SimpleImageSlider
                  width={596}
                  height={504}
                  images={product.images}
                  showNavs={true}
                  autoPlay={true}
                  autoPlayDelay={1.5}
                />
              )}
            </div>
            <div className="md:flex-1 px-4">
              <ProductDescription product={product} />
              <div className="flex py-4 space-x-4">
                {currentCart.some((p) => p.id === product.id) ? (
                  <StyledButton onClick={removeFromCart}>
                    Remove item
                  </StyledButton>
                ) : (
                  <StyledButton onClick={addToCart}>Add to cart</StyledButton>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
