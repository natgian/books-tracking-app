import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Searchbar from "./components/Searchbar/Searchbar";
import "./index.css";
import Searchresults from "./components/Seearchresults/Searchresults";
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
        path: "/book",
        element: <Book />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
