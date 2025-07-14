import React from "react";
import Home from "../src/Pages/Home.jsx";
import { CreateRouter } from "../../mjs/AppRouter.jsx";

export default CreateRouter([
  {
    path: "/",
    element: <Home />,
  },
]);
