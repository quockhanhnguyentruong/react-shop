import { fireEvent, render, screen } from "@testing-library/react";
import CartItem from "./CartItem";
import CheckoutForm from ".";

const mockItem = [
  {
    key: 1,
    id: 1,
    name: "Samsung Universe 9",
    images: ["https://dummyjson.com/image/i/products/3/1.jpg"],
    price: 1249,
    quantity: 1,
    title: "Samsung Universe 9",
  },
];

const mockCartItems = mockItem.map((item) => (
  <CartItem
    key={item.id}
    id={item.id}
    name={item.title}
    price={item.price}
    title={item.title}
    images={item.images}
    quantity={item.quantity}
  />
));

const mockSelector = jest.fn();
const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: () => mockSelector,
  useDispatch: () => mockDispatch.mockReturnValueOnce(true),
}));

describe("Checkout form with wrong value", () => {
  it("Should handle all field is required", async () => {
    render(<CheckoutForm cartItems={mockCartItems} />);
    const submit = screen.getByTestId("submit");
    fireEvent.click(submit);
    await screen.findAllByText("This field is required");
  });
  it("Should handle wrong name input", async () => {
    render(<CheckoutForm cartItems={mockCartItems} />);
    const name = screen.getByLabelText("Name");
    const submit = screen.getByTestId("submit");
    fireEvent.change(name, { target: { value: "zxc zxc" } });
    expect(name.value).toBe("zxc zxc");
    fireEvent.click(submit);
    await screen.findByText("Invalid Name");
  });
  it("Should handle wrong email input", async () => {
    render(<CheckoutForm cartItems={mockCartItems} />);
    const email = screen.getByLabelText("Email");
    const submit = screen.getByTestId("submit");
    fireEvent.change(email, { target: { value: "test.email" } });
    expect(email.value).toBe("test.email");
    fireEvent.click(submit);
    await screen.findByText("Invalid Email");
  });
  it("Should handle wrong zip code input", async () => {
    render(<CheckoutForm cartItems={mockCartItems} />);
    const zip_code = screen.getByLabelText("Zip");
    const submit = screen.getByTestId("submit");
    fireEvent.change(zip_code, { target: { value: "test" } });
    expect(zip_code.value).toBe("test");
    fireEvent.click(submit);
    await screen.findByText("Invalid ZIP Code");
  });
  it("Should handle wrong card number input", async () => {
    render(<CheckoutForm cartItems={mockCartItems} />);
    const card_number = screen.getByLabelText("CardNumber");
    const submit = screen.getByTestId("submit");
    fireEvent.change(card_number, { target: { value: "test" } });
    expect(card_number.value).toBe("test");
    fireEvent.click(submit);
    await screen.findByText("Invalid Card Visa Number");
  });
});

describe("Checkout form with right value", () => {
  it("Should handle right name input", async () => {
    render(<CheckoutForm cartItems={mockCartItems} />);
    const name = screen.getByLabelText("Name");
    const submit = screen.getByTestId("submit");
    fireEvent.change(name, { target: { value: "test" } });
    expect(name.value).toBe("test");
    fireEvent.click(submit);
    const error = screen.queryByText("Invalid Name");
    expect(error).toBeNull();
  });
  it("Should handle right email input", async () => {
    render(<CheckoutForm cartItems={mockCartItems} />);
    const email = screen.getByLabelText("Email");
    const submit = screen.getByTestId("submit");
    fireEvent.change(email, { target: { value: "test@gmail.com" } });
    expect(email.value).toBe("test@gmail.com");
    fireEvent.click(submit);
    const error = screen.queryByText("Invalid Email");
    expect(error).toBeNull();
  });
  it("Should handle right zip code input", async () => {
    render(<CheckoutForm cartItems={mockCartItems} />);
    const zip_code = screen.getByLabelText("Zip");
    const submit = screen.getByTestId("submit");
    fireEvent.change(zip_code, { target: { value: "880000" } });
    expect(zip_code.value).toBe("880000");
    fireEvent.click(submit);
    const error = screen.queryByText("Invalid ZIP Code");
    expect(error).toBeNull();
  });
  it("Should handle right card number input", async () => {
    render(<CheckoutForm cartItems={mockCartItems} />);
    const card_number = screen.getByLabelText("CardNumber");
    const submit = screen.getByTestId("submit");
    fireEvent.change(card_number, { target: { value: "374245455400126" } });
    expect(card_number.value).toBe("374245455400126");
    fireEvent.click(submit);
    const error = screen.queryByText("Invalid Card Visa Number");
    expect(error).toBeNull();
  });
});
