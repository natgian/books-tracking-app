import "./index.css";
import "./fonts/roboto.css";
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
  ForgotPassword,
  ChangePassword,
  Profile,
  ReadingLists,
  PrivacyPolicy,
  Contact,
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
import ResetPassword from "./pages/ResetPassword";

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
    path: "/passwort-vergessen",
    element: <ForgotPassword />,
  },
  {
    path: "/user/reset/:token",
    element: <ResetPassword />,
  },
  {
    path: "/passwort-aktualisieren",
    element: (
      <ProtectedRoute>
        <ChangePassword />
      </ProtectedRoute>
    ),
  },
  {
    path: "/datenschutz",
    element: <PrivacyPolicy />,
  },
  {
    path: "/kontakt",
    element: <Contact />,
  },
]);

function App() {
  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AuthContextProvider>
  );
}

export default App;
