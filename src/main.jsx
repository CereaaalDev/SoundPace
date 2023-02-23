import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";

import App from "./App";
import Home from "./features/Home";
import Dashboard from "./features/Dashboard/index";
import NotFound from "./components/errors/NotFound";
import AccountError from "./components/errors/AccountError";
import Callback from "./features/Auth/Callback";
import { PaceCreator } from "./features/PaceCreator";
import ProtectedRoute from "./util/ProtectedRoute";

import GlobalCSS from "./util/global.css";
import "./css_reset.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/account-signup",
        element: <AccountError />,
      },
      {
        path: "/dashboard",
        element: <ProtectedRoute element={<Dashboard />} />,
      },
      {
        path: "/pacecreator",
        element: <ProtectedRoute element={<PaceCreator />} />,
      },
    ],
  },
  {
    path: "/logincallback",
    element: <Callback />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  //<React.StrictMode>
  <Provider store={store}>
    <GlobalCSS />
    <RouterProvider router={router} />
  </Provider>
  //</React.StrictMode>
);
