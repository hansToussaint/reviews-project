import { BrowserRouter, Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material";
import { Toaster } from "react-hot-toast";

import theme from "./styles/Theme";
import PageNotFound from "./pages/PageNotFound";
import AuthLayout from "./layouts/AuthLayout";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import MainLayout from "./layouts/MainLayout";
import ReviewDetails from "./pages/ReviewDetails";
import CreateReview from "./pages/CreateReview";
import Home from "./pages/Home";
import { AuthProvider } from "./context/AuthContext";
import BookmarkPage from "./pages/Bookmarks";
import CategoriesPage from "./pages/CategoriesPage";

const App: React.FC = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // staleTime: 0,

        staleTime: 1000 * 60 * 10, // Fresh data 10 min
        gcTime: 1000 * 60 * 30, // Cache kept for 30 min
        refetchOnWindowFocus: false, // No refetch when in focus
        refetchOnReconnect: false, // No refetch when reconnecting
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<MainLayout />}>
                <Route index element={<Home />} />

                <Route path="/" element={<Home />} />
                <Route path="/reviews/:reviewId" element={<ReviewDetails />} />
                <Route path="/create" element={<CreateReview />} />
                <Route path="/bookmarks" element={<BookmarkPage />} />
                <Route
                  path="/categories/:category"
                  element={<CategoriesPage />}
                />
              </Route>

              <Route element={<AuthLayout />}>
                <Route path="signin" element={<SignIn />} />
                <Route path="signup" element={<SignUp />} />
              </Route>

              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>

          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
              success: {
                duration: 5000,
              },
              error: {
                duration: 7000,
              },
              style: {
                fontSize: "16px",
                maxWidth: "500px",
                padding: "16px, 24px",
                backgroundColor: theme.palette.common.mainBackground,
                color: theme.palette.common.secondaryText,
              },
            }}
          />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
