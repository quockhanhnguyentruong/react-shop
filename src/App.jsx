import Home from "./pages/Home";
// import ProductDetails from "./pages/ProductDetails";
import ProductDetailsQuery from "./pages/ProductDetailsQuery";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { Slide } from "@mui/material";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";

function App() {
  return (
    <>
      <Router>
        <SnackbarProvider
          TransitionComponent={Slide}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route
              exact
              path="/product/:id"
              element={<ProductDetailsQuery />}
            />
            <Route exact path="/cart" element={<Cart />} />
          </Routes>
        </SnackbarProvider>
      </Router>
    </>
  );
}

export default App;
