import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from "./store";

import App from "./App";
import NotFound from "./features/Errors/NotFound";
import AfterLogin from "./features/AfterLogin/AfterLogin";
import LoginError from "./features/Errors/LoginError";
import Arrived from "./features/AfterLogin/Arrived";
import { Provider } from "react-redux";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/child",
        element: <Arrived />,
      },
    ],
  },
  {
    path: "/afterLogin",
    element: <AfterLogin />,
    errorElement: <LoginError />
  },
  {
    path: "/arrived",
    element: <Arrived />,
    errorElement: <LoginError />
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
 // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
    
 // </React.StrictMode>
);
