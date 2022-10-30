import React, { useContext } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ResetPassword from "./pages/reset-password/ResetPassword";
import SignUp from "./pages/signup/SignUp";
import ProfileOverview from "./pages/profile/ProfileOverview";
import ContentOverview from "./pages/content/ContentOverview";
import ContactsOverview from "./pages/contacts/ContactsOverview";
import AuthContextProvider from "./context/AuthContext";
import { AuthContext } from "./context/AuthContext";
import ForgotPassword from "./pages/forgot-password/ForgotPassword";
import SpacesOverview from "./pages/spaces/SpacesOverview";
import LogIn from "./pages/login/LogIn";
import CreateAccount from "./pages/signup/CreateAccount";
import WebGlSection from "./feature/web-gl/WebGlSection";
import Onboarding from "./pages/onboarding/Onboarding";
import SpaceDetails from "./pages/spaces/SpaceDetails";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/create-account/:token" element={<CreateAccount />} />

          <Route
            path="/reset-password/:resetPasswordCode"
            element={<ResetPassword />}
          />
          <Route
            path="/spaces/:spaceId"
            element={
              <PrivateRoute>
                <WebGlSection />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfileOverview />
              </PrivateRoute>
            }
          />
          <Route
            path="/spaces"
            element={
              <PrivateRoute>
                <SpacesOverview />
              </PrivateRoute>
            }
          />
          <Route
            path="/spaces/details/:spaceUuid"
            element={
              <PrivateRoute>
                <SpaceDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/content"
            element={
              <PrivateRoute>
                <ContentOverview />
              </PrivateRoute>
            }
          />
          <Route
            path="/contacts"
            element={
              <PrivateRoute>
                <ContactsOverview />
              </PrivateRoute>
            }
          />
          <Route
            path="/welcome"
            element={
              <PrivateRoute>
                <Onboarding />
              </PrivateRoute>
            }
          />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <ProfileOverview />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;

function PrivateRoute({ children }) {
  const { isAuth } = useContext(AuthContext);
  return isAuth ? children : <Navigate to="/login" />;
}
