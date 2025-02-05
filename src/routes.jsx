import { Navigate, useRoutes } from "react-router-dom";
import DashboardLayout from "./layouts/dashboard/layout";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import StudentTable from "./sections/student-table";

export default function Router() {
  const routes = useRoutes([
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/students" />, index: true },
        { path: "students", element: <StudentTable /> },
      ],
    },
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "register",
      element: <RegisterPage />,
    },
    {
      path: "/",
      element: <Navigate to="/login" />,
    },
  ]);

  return routes;
}
