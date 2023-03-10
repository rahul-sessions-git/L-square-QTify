import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import App from "./App";
import "./index.css";
import AlbumId from "./pages/albumId/AlbumId";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/album/:albumId",
    element: <AlbumId />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
