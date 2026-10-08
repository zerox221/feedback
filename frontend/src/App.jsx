import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPageLayout from "./layouts/LandingPageLayout";
import LandingPage from "./page/Public/LandingPage";
import Login from "./page/Public/Login";
import Signup from "./page/Public/Signup";
import Verify from "./page/Public/Verify";
import PublicProtectedRoute from "./protectedRoutes/PublicProtectedRoute";
import { useContext } from "react";
import { userContext } from "./context/userContext";
import DashboardLayout from "./layouts/DashboardLayout";
import UserProtectedRoute from "./protectedRoutes/UserProtectedRoute";
import ShareFeedBack from "./page/Public/ShareFeedBack";
import Dashboard from "./page/dashboard/dasboard";
import { Toaster } from "sonner";
const App = () => {
  const { user, setUser, loading } = useContext(userContext);
  return loading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <Toaster/>
      <Routes>
        <Route
          path="/"
          element={
            <PublicProtectedRoute user={user}>
              <LandingPageLayout />
            </PublicProtectedRoute>
          }
        >
          <Route index element={<LandingPage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Signup />} />
          <Route path="verify" element={<Verify />} />
        </Route>

        <Route
          path="/m/:feedbackId"
          element={<ShareFeedBack/>}
        />  

        <Route path="*" element={<div>404 Not Found</div>} />
        <Route
          path="/dashboard"
          element={
            <UserProtectedRoute user={user}>
              <DashboardLayout />
            </UserProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          
        </Route>
      </Routes>
    </div>
  );
};

export default App;
