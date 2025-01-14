import "./App.css";
import LoginPage from "./_home/login/LoginPage";
import { Routes, Route } from "react-router";
import About from "./_home/about/About";
import { PublicLayout } from "./_home/_components/layouts/PublicLayout";
import DashboardLayout from "./dashboard/_components/layout/DashboardLayout";
import DashboardPage from "./dashboard/_/DashboardPage";
import Page404 from "./_home/404/Page404";
import UserRegisterPage from "./_home/user/register/UserRegisterPage";
import TicketListPage from "./_home/ticket/list/TicketListPage";
import UserListPage from "./_home/user/list/UserListPage";
import TicketCreatePage from "./_home/ticket/create/TicketCreatePage";
import TicketUpdatePage from "./_home/ticket/update/TicketUpdatePage";
import TicketDeletePage from "./_home/ticket/delete/TicketDeletePage";
import TransportCreatePage from "./_home/transport/create/TransportCreatePage";
import TransportListPage from "./_home/transport/list/TransportListPage";
import TransportUpdatePage from "./_home/transport/update/TransportUpdatePage";
import TransportDeletePage from "./_home/transport/delete/TransportDeletePage";
import MunicipalityListPage from "./_home/municipality/list/MunicipalityListPage";
import MunicipalityCreatePage from "./_home/municipality/create/MunicipalityCreatePage";
import UserDeletePage from "./_home/user/delete/UserDeletePage";
import UserUpdatePage from "./_home/user/update/UserUpdatePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PublicLayout><LoginPage /></PublicLayout>} />
        <Route path="/user/list" element={<PublicLayout><UserListPage /></PublicLayout>} />
        <Route path="/user/register" element={<PublicLayout><UserRegisterPage /></PublicLayout>} />
        <Route path="/login" element={<PublicLayout><LoginPage /></PublicLayout>} />
        <Route path="/user/update/:id" element={<PublicLayout><UserUpdatePage /></PublicLayout>} />
        <Route path="/user/delete" element={<PublicLayout><UserDeletePage /></PublicLayout>} />
        
        <Route path="/ticket/list" element={<PublicLayout><TicketListPage /></PublicLayout>} />
        <Route path="/ticket/create" element={<PublicLayout><TicketCreatePage /></PublicLayout>} />
        <Route path="/ticket/update/:id" element={<PublicLayout><TicketUpdatePage /></PublicLayout>} />
        <Route path="/ticket/delete" element={<PublicLayout><TicketDeletePage /></PublicLayout>} />

        <Route path="/transport/list" element={<PublicLayout><TransportListPage /></PublicLayout>} />
        <Route path="/transport/create" element={<PublicLayout><TransportCreatePage /></PublicLayout>} />
        <Route path="/transport/update/:id" element={<PublicLayout><TransportUpdatePage /></PublicLayout>} />
        <Route path="/transport/delete" element={<PublicLayout><TransportDeletePage /></PublicLayout>} />

        <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
        <Route path="/dashboard" element={<DashboardLayout><DashboardPage /></DashboardLayout>} />
        <Route path="*" element={<PublicLayout><Page404 /></PublicLayout>} />
      </Routes>
    </>
  );
}

export default App;
