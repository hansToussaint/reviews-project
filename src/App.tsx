import { BrowserRouter, Route, Routes } from "react-router";
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

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />

            <Route path="/" element={<Home />} />
            <Route path="/reviews/:reviewId" element={<ReviewDetails />} />
            <Route path="/create" element={<CreateReview />} />
          </Route>

          <Route path="/auth" element={<AuthLayout />}>
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
    </ThemeProvider>
  );
};

export default App;
