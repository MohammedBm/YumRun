import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./context/Auth";
import { UserProfilePage } from "./pages/UserProfilePage";
import ManageStorePage from "./pages/ManageStorePage";
import { SearchPage } from "./pages/SearchPage";
import { DetailPage } from "./pages/DetailPage";

const AppRoutes = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        return;
      }

      setUser(null);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <Layout showHero>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/signup"
          element={
            <Layout>
              <SignUpPage user={user} />
            </Layout>
          }
        />
        <Route
          path="/search/:city"
          element={
            <Layout showHero={false}>
              <SearchPage />
            </Layout>
          }
        />

        <Route
          path="/detail/:storeId"
          element={
            <Layout showHero={false}>
              <DetailPage />
            </Layout>
          }
        />
        {/* protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/user-profile"
            element={
              <Layout>
                <UserProfilePage />
              </Layout>
            }
          />
          <Route
            path="/manage-store"
            element={
              <Layout>
                <ManageStorePage />
              </Layout>
            }
          />
        </Route>
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </AuthProvider>
  );
};

export default AppRoutes;
