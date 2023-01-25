import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from "./store";

import App from "./App";
import NotFound from "./features/Errors/NotFound";
import AfterLogin from "./features/auth/Callback";
import LoginError from "./features/Errors/LoginError";
import Dashboard from "./features/Dashboard/index";
import Home from "./features/Home";
import { Provider } from "react-redux";
import ProtectedRoute from "./util/ProtectedRoute";
import Callback from "./features/auth/Callback";

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
        path: "/dashboard",
        element: <ProtectedRoute element={<Dashboard />} />,
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
    <RouterProvider router={router} />
  </Provider>
  //</React.StrictMode>
);
