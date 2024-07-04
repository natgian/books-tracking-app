import "./index.css";
import Searchresults from "./pages/Seearchresults/Searchresults";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainLayout, Homepage, Book } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "/buch",
        element: <Book />,
      },
      {
        path: "/suchresultate",
        element: <Searchresults />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
