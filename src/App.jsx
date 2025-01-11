import "./App.css";
import LoginPage from "./_home/login/LoginPage";
import { Routes, Route } from "react-router";
import About from "./_home/about/About";
import { PublicLayout } from "./_home/_components/layouts/PublicLayout";
import DashboardLayout from "./dashboard/_components/layout/DashboardLayout";
import DashboardPage from "./dashboard/_/DashboardPage";
import Page404 from "./_home/404/Page404";
import UserListPage from "./dashboard/user/list/UserListPage";

// const NotFound = () => (
//   <div>
//     <h1>404</h1>
//     <p>La página que buscas no existe.</p>
//   </div>
// );

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<PublicLayout><LoginPage /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
        <Route path="/dashboard" element={<DashboardLayout><DashboardPage /></DashboardLayout>} />
        <Route path="/user/list" element={<DashboardLayout><UserListPage /></DashboardLayout>} />
        <Route path="*" element={<Page404/>} />
      </Routes>
    </>
  );
}

export default App;
