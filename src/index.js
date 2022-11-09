import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./redux/Store";
import "./index.css";
import { ConfirmContextProvider } from "./redux/ConfirmContextProvider";
import ConfirmDialog from "./components/ConfirmDialog";
import { QueryClient, QueryClientProvider } from "react-query";

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();

root.render(
  <>
    <ConfirmContextProvider>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <App />
          <ConfirmDialog />
        </Provider>
      </QueryClientProvider>
    </ConfirmContextProvider>
  </>
);

reportWebVitals();
