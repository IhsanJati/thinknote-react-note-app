import { Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";
import CreateNotePage from "./pages/CreateNote";
import ArchivedPage from "./pages/ArchivedNotePage";
import DetailNotePage from "./pages/DetailNotePage";

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<GuestRoute />}>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/create" element={<CreateNotePage />} />
          <Route path="/archived" element={<ArchivedPage />} />
          <Route path="/note/:id" element={<DetailNotePage/>}/>
        </Route>
      </Routes>
    </>
  );
};

export default App;
