import "./App.css";
import LoginPage from "./_home/login/LoginPage";
import { Routes, Route } from "react-router";
import About from "./_home/about/About";
import { PublicLayout } from "./_home/_components/layouts/PublicLayout";
import DashboardLayout from "./dashboard/_components/layout/DashboardLayout";
import DashboardPage from "./dashboard/_/DashboardPage";
import Page404 from "./_home/404/Page404";
// import UserListPage from "./dashboard/user/list/UserListPage";
import UserRegisterPage from "./_home/user/register/UserRegisterPage";
import TicketListPage from "./_home/ticket/list/TicketListPage";
import UserListPage2 from "./_home/user/list/UserListPage";
import TicketCreatePage from "./_home/ticket/create/TicketCreatePage";
import TicketUpdatePage from "./_home/ticket/update/TicketUpdatePage";
import TicketDeletePage from "./_home/ticket/delete/TicketDeletePage";
import TransportCreatePage from "./_home/transport/create/TransportCreatePage";
import TransportListPage from "./_home/transport/list/TransportListPage";

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
        <Route path="/" element={<PublicLayout><LoginPage /></PublicLayout>} />
        <Route path="/login" element={<PublicLayout><LoginPage /></PublicLayout>} />
        <Route path="/user/register" element={<PublicLayout><UserRegisterPage /></PublicLayout>} />
        <Route path="/user/list" element={<PublicLayout><UserListPage2 /></PublicLayout>} />
        
        <Route path="/ticket/list" element={<PublicLayout><TicketListPage /></PublicLayout>} />
        <Route path="/ticket/create" element={<PublicLayout><TicketCreatePage /></PublicLayout>} />
        <Route path="/ticket/update/:id" element={<PublicLayout><TicketUpdatePage /></PublicLayout>} />
        <Route path="/ticket/delete" element={<PublicLayout><TicketDeletePage /></PublicLayout>} />

        <Route path="/transport/list" element={<PublicLayout><TransportListPage /></PublicLayout>} />
        <Route path="/transport/create" element={<PublicLayout><TransportCreatePage /></PublicLayout>} />

        <Route path="/municipality/list" element={<PublicLayout><TransportListPage /></PublicLayout>} />
        <Route path="/municipality/create" element={<PublicLayout><TransportCreatePage /></PublicLayout>} />

        <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
        <Route path="/dashboard" element={<DashboardLayout><DashboardPage /></DashboardLayout>} />
        <Route path="*" element={<PublicLayout><Page404 /></PublicLayout>} />
      </Routes>
    </>
  );
}

export default App;
