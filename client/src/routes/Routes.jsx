import { createBrowserRouter } from "react-router";
import ErrorPage from "../components/pages/shared/ErrorPage";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../components/pages/Authentication/Login";
import Register from "../components/pages/Authentication/Register";
import DashboardHome from "../components/pages/DashBoard/DashboardHome";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import CreateStudySession from "../components/pages/Tutor/CreateStudySession";
import TutorRoute from "./TutorRoute";
import Forbidden from "../components/pages/shared/Forbidden";
import ManageUsers from "../components/pages/Admin/ManageUsers";
import AdminRoute from "./AdminRoute";
import ManageSessions from "../components/pages/Admin/ManageSessions";
import MySessions from "../components/pages/Tutor/MySessions";
import UploadMaterials from "../components/pages/Tutor/UploadMaterials";
import MyMaterials from "../components/pages/Tutor/MyMaterials";
import ManageMaterials from "../components/pages/Admin/ManageMaterials";
import Home from "../components/pages/Home/Home";
import SessionDetails from "../components/pages/Session/SessionDetails";
import Payment from "../components/pages/Payment/Payment";
import StudentRoute from "./StudentRoute";
import BookedSessions from "../components/pages/Student/BookedSessions";
import SessionsAll from "../components/pages/Session/SessionsAll";
import CreateNote from "../components/pages/Student/CreateNote";
import ManageNotes from "../components/pages/Student/ManageNotes";
import ViewMaterials from "../components/pages/Student/ViewMaterials";
import TutorsList from "../components/pages/Tutors/TutorsList";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "tutors",
        Component: TutorsList,
      },
      {
        path: "sessions",
        Component: SessionsAll,
      },
      {
        path: "sessions/:id",
        Component: SessionDetails,
      },
      {
        path: "payment/:sessionId",
        Component: Payment,
      },
      {
        path: "forbidden",
        Component: Forbidden,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      // Student Role Links
      {
        path: "booked-sessions",
        element: (
          <StudentRoute>
            <BookedSessions />
          </StudentRoute>
        ),
      },
      {
        path: "create-note",
        element: (
          <StudentRoute>
            <CreateNote />
          </StudentRoute>
        ),
      },
      {
        path: "manage-notes",
        element: (
          <StudentRoute>
            <ManageNotes />
          </StudentRoute>
        ),
      },
      {
        path: "view-materials",
        element: (
          <StudentRoute>
            <ViewMaterials />
          </StudentRoute>
        ),
      },
      // Tutor Role Links
      {
        path: "create-study-session",
        element: (
          <TutorRoute>
            <CreateStudySession />
          </TutorRoute>
        ),
      },
      {
        path: "my-sessions",
        element: (
          <TutorRoute>
            <MySessions />
          </TutorRoute>
        ),
      },
      {
        path: "upload-materials",
        element: (
          <TutorRoute>
            <UploadMaterials />
          </TutorRoute>
        ),
      },
      {
        path: "my-materials",
        element: (
          <TutorRoute>
            <MyMaterials />
          </TutorRoute>
        ),
      },
      // Admin Role Links
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "manage-sessions",
        element: (
          <AdminRoute>
            <ManageSessions />
          </AdminRoute>
        ),
      },
      {
        path: "manage-materials",
        element: (
          <AdminRoute>
            <ManageMaterials />
          </AdminRoute>
        ),
      },
    ],
  },
]);
