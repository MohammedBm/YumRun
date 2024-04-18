import { auth } from "@/firebase";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  return auth.currentUser ? <Outlet /> : <Navigate to="/" replace />;
};