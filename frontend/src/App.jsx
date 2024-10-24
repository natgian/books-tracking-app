import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { AuthContextProvider } from "./context/AuthContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ProtectedRoute } from "./components";
import {
  MainLayout,
  Homepage,
  Book,
  Error,
  Searchresults,
  SearchresultsAuthor,
  Login,
  Registration,
  Profile,
  ReadingLists,
  PrivacyPolicy,
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

// ROUTER
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
      {
        path: "/leselisten",
        element: (
          <ProtectedRoute>
            <ReadingLists />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profil",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/datenschutz",
    element: <PrivacyPolicy />,
  },
]);

function App() {
  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        {/* <ReactQueryDevtools initialIsOpen={true} /> */}
      </QueryClientProvider>
    </AuthContextProvider>
  );
}

export default App;
