import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  MainLayout,
  Homepage,
  Book,
  Error,
  Searchresults,
  SearchresultsAuthor,
} from "./pages";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

import { loader as searchResultsLoader } from "./pages/Searchresults/Searchresults";
import { loader as singleBookLoader } from "./pages/Book/Book";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
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
      {
        path: "/suchresultate/autor/:author",
        element: <SearchresultsAuthor />,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {/* <ReactQueryDevtools initialIsOpen={true} /> */}
    </QueryClientProvider>
  );
}

export default App;
