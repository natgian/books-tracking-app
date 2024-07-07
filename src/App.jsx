import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { MainLayout, Homepage, Book } from "./pages";
import { singleBookLoader } from "./pages/Book/Book";
import Searchresults, {
  searchResultsLoader,
} from "./pages/Searchresults/Searchresults";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

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
        path: "/buch/:id",
        element: <Book />,
        loader: singleBookLoader(queryClient),
      },
      {
        path: "/suchresultate",
        element: <Searchresults />,
        loader: searchResultsLoader(queryClient),
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;
