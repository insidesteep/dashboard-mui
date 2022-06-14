import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useRoutes, useNavigate, Outlet } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
//
import { Backdrop, CircularProgress } from "@mui/material";
import Blog from "./pages/Blog";
import User from "./pages/User";
import Login from "./pages/Login";
import NotFound from "./pages/Page404";
import Register from "./pages/Register";
import Products from "./pages/Products";
import DashboardApp from "./pages/DashboardApp";
import Posts from "./pages/Posts";
import CategoryList from "./pages/CategoryList";
import PhotoGalleryList from "./pages/PhotoGalleryList";
import VideoGalleryList from "./pages/VideoGalleryList";
import CreatePost from "./pages/CreatePost";
import { authorization, showLoading } from "./redux/actions/auth";
import { AUTH_TOKEN } from "./redux/constants/auth";

// ----------------------------------------------------------------------

export default function Router() {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem(AUTH_TOKEN)) {
      dispatch(showLoading());
      dispatch(authorization());
    }
  }, []);

  useEffect(() => {
    if (userInfo) {
      navigate("/dashboard/posts");
    }
  }, [userInfo]);

  return useRoutes([
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute user={userInfo}>
          <DashboardLayout />
        </ProtectedRoute>
      ),
      children: [
        { path: "app", element: <DashboardApp /> },
        { path: "user", element: <User /> },
        { path: "products", element: <Products /> },
        { path: "blog", element: <Blog /> },
        { path: "posts", element: <Posts /> },
        { path: "categories", element: <CategoryList /> },
        { path: "photogalleries", element: <PhotoGalleryList /> },
        { path: "videogalleries", element: <VideoGalleryList /> },
        { path: "posts/create", element: <CreatePost /> },
      ],
    },
    {
      path: "/",
      element: <LogoOnlyLayout />,
      children: [
        { path: "/", element: <Navigate to="/dashboard/app" /> },
        { path: "auth/login", element: <Login /> },
        { path: "auth/register", element: <Register /> },
        { path: "404", element: <NotFound /> },
        // { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    // { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

const ProtectedRoute = ({ user, redirectPath = "/auth/login", children }) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};
