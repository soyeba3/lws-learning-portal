import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import AdminPrivateRoute from "./admin/components/adminRoute/AdminPrivateRoute";
import AdminPublicRoute from "./admin/components/adminRoute/AdminPublicRoute";
import AssignmentMark from "./admin/pages/assignment-mark/AssignmentMark";
import AddAssignment from "./admin/pages/assignment/AddAssignment";
import AdminAssignment from "./admin/pages/assignment/AdminAssignment";
import EditAssignment from "./admin/pages/assignment/EditAssignment";
import AdminDashboard from "./admin/pages/dashboard/AdminDashboard";
import AdminLogin from "./admin/pages/login/AdminLogin";
import AddQuizze from "./admin/pages/quizzes/AddQuizze";
import AdminQuizzes from "./admin/pages/quizzes/AdminQuizzes";
import EditQuizze from "./admin/pages/quizzes/EditQuizze";
import AddVideo from "./admin/pages/videos/AddVideo";
import AdminVideos from "./admin/pages/videos/AdminVideos";
import EditVideo from "./admin/pages/videos/EditVideo";
import PrivateRoute from "./components/route/PrivateRoute";
import PublicRoute from "./components/route/PulicRoute";
import { useGetVideosQuery } from "./features/admin/videos/VideosApi";
import useAuthCheck from "./hooks/useAuthCheck";
import Home from "./pages/Home";
import Leaderborad from "./pages/LeaderBoard";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Quizzes from "./pages/Quizzes";
import Register from "./pages/Register";
import "./style/output.css";

function App() {
  const authChecked = useAuthCheck();
  const { data: videos } = useGetVideosQuery() || [];
  const { id } = (videos && videos[0]) || {};

  return !authChecked ? (
    <div>Checking authentication....</div>
  ) : (
    <Router>
      <Routes>
        {/* Student Route */}
        {id && <Route exact path="/" element={<Navigate to={`/${id}`} />} />}
        <Route
          path="/:id"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              {" "}
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/leaderBoard"
          element={
            <PrivateRoute>
              <Leaderborad />
            </PrivateRoute>
          }
        />
        <Route
          path="/quiz/:id"
          element={
            <PrivateRoute>
              <Quizzes />
            </PrivateRoute>
          }
        />
        <Route
          path="*"
          element={
            <PublicRoute>
              <PageNotFound />
            </PublicRoute>
          }
        />

        {/*Admin Route */}

        <Route
          path="/admin/login"
          element={
            <AdminPublicRoute>
              {" "}
              <AdminLogin />
            </AdminPublicRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminPrivateRoute>
              {" "}
              <AdminDashboard />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/videos"
          element={
            <AdminPrivateRoute>
              <AdminVideos />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/videos/add"
          element={
            <AdminPrivateRoute>
              <AddVideo />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/videos/edit/:id"
          element={
            <AdminPrivateRoute>
              <EditVideo />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/assignments"
          element={
            <AdminPrivateRoute>
              {" "}
              <AdminAssignment />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/assignment/add"
          element={
            <AdminPrivateRoute>
              {" "}
              <AddAssignment />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/assignment/edit/:id"
          element={
            <AdminPrivateRoute>
              {" "}
              <EditAssignment />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/quizzes"
          element={
            <AdminPrivateRoute>
              {" "}
              <AdminQuizzes />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/quizzes/add"
          element={
            <AdminPrivateRoute>
              {" "}
              <AddQuizze />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/quizzes/edit/:id"
          element={
            <AdminPrivateRoute>
              {" "}
              <EditQuizze />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin/assignment-mark"
          element={
            <AdminPrivateRoute>
              {" "}
              <AssignmentMark />
            </AdminPrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
