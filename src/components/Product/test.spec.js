import { fireEvent, render, screen } from "@testing-library/react";
import Product from ".";
import * as redux from "react-redux";
import { SnackbarProvider } from "notistack";

const mockItem = {
  id: 3,
  images: ["https://dummyjson.com/image/i/products/3/1.jpg"],
  price: 1249,
  quantity: 1,
  title: "Samsung Universe 9",
};

const mockCurrentCart = [
  {
    id: 1,
    images: ["https://dummyjson.com/image/i/products/3/1.jpg"],
    price: 1249,
    quantity: 1,
    title: "Samsung Universe 9",
  },
];
const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

const mockDispatch = jest.fn();
const mockSelector = jest.fn();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch.mockReturnValueOnce(true),
  useSelector: () => mockSelector,
}));

describe("Should handle item product does not exist in current cart", () => {
  beforeEach(() => {
    jest
      .spyOn(redux, "useSelector")
      .mockReturnValueOnce({ currentCart: mockCurrentCart });
  });
  it("Product image correct src value", () => {
    render(
      <SnackbarProvider>
        <Product item={mockItem} />
      </SnackbarProvider>
    );
    const image = screen.getByTestId("product-image");
    expect(image.src).toContain(
      "https://dummyjson.com/image/i/products/3/1.jpg"
    );
  });
  it("Product title correct value", () => {
    render(
      <SnackbarProvider>
        <Product item={mockItem} />
      </SnackbarProvider>
    );
    const title = screen.getByTestId("product-title");
    expect(title).toHaveTextContent("Samsung Universe 9");
  });
  it("Product price correct value", () => {
    render(
      <SnackbarProvider>
        <Product item={mockItem} />
      </SnackbarProvider>
    );
    const price = screen.getByTestId("product-price");
    expect(price).toHaveTextContent("1249");
  });
  it("Add to cart", async () => {
    render(
      <SnackbarProvider>
        <Product item={mockItem} />
      </SnackbarProvider>
    );
    const addToCart = screen.getByTestId("btn-add-product");
    fireEvent.click(addToCart);
    const noti = screen.queryByText(
      "Samsung Universe 9 added to your cart successfully"
    );
    expect(mockDispatch).toBeCalledTimes(2);
    expect(noti).toBeInTheDocument();
  });
  it("Product details", () => {
    render(
      <SnackbarProvider>
        <Product item={mockItem} />
      </SnackbarProvider>
    );
    const detail = screen.getByTestId("btn-detail-product");
    fireEvent.click(detail);
    expect(mockDispatch).toBeCalledTimes(1);
    expect(mockedUsedNavigate).toBeCalledTimes(1);
  });
});

describe("Should handle item product exist in current cart", () => {
  beforeEach(() => {
    jest.spyOn(redux, "useSelector").mockReturnValueOnce({
      currentCart: [
        {
          id: 3,
          images: ["https://dummyjson.com/image/i/products/3/1.jpg"],
          price: 1249,
          quantity: 1,
          title: "Samsung Universe 9",
        },
      ],
    });
  });
  it("Product image correct src value", () => {
    render(
      <SnackbarProvider>
        <Product item={mockItem} />
      </SnackbarProvider>
    );
    const image = screen.getByTestId("product-image");
    expect(image.src).toContain(
      "https://dummyjson.com/image/i/products/3/1.jpg"
    );
  });
  it("Product title correct value", () => {
    render(
      <SnackbarProvider>
        <Product item={mockItem} />
      </SnackbarProvider>
    );
    const title = screen.getByTestId("product-title");
    expect(title).toHaveTextContent("Samsung Universe 9");
  });
  it("Product price correct value", () => {
    render(
      <SnackbarProvider>
        <Product item={mockItem} />
      </SnackbarProvider>
    );
    const price = screen.getByTestId("product-price");
    expect(price).toHaveTextContent("1249");
  });
  it("Add to cart", async () => {
    render(
      <SnackbarProvider>
        <Product item={mockItem} />
      </SnackbarProvider>
    );
    const removeFromCart = screen.getByTestId("btn-remove-product");
    fireEvent.click(removeFromCart);
    const noti = screen.queryByText(
      "Samsung Universe 9 removed from your cart!"
    );
    expect(mockDispatch).toBeCalledTimes(2);
    expect(noti).toBeInTheDocument();
  });
  it("Product details", () => {
    render(
      <SnackbarProvider>
        <Product item={mockItem} />
      </SnackbarProvider>
    );
    const detail = screen.getByTestId("btn-detail-product");
    fireEvent.click(detail);
    expect(mockDispatch).toBeCalledTimes(1);
    expect(mockedUsedNavigate).toBeCalledTimes(1);
  });
});
