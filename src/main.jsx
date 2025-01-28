import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { Provider } from "react-redux";
import store from "./store/reduxStore.js";
import "./index.css";

import App from "./App.jsx";
import DashboardLayout from "./app/dashboard/_layout/DashboardLayout";
import TicketListPage from "./app/dashboard/ticket/list/TicketListPage";
import TicketCreatePage from "./app/dashboard/ticket/create/TicketCreatePage";
import TicketUpdatePage from "./app/dashboard/ticket/update/TicketUpdatePage";
import TicketImportPage from "./app/dashboard/ticket/import/TicketImportPage";
import TicketApprovePage from "./app/dashboard/ticket/approve/TicketApprovePage";
import TicketByIdPage from "./app/dashboard/ticket/id/TicketByIdPage";
import UserListPage from "./app/dashboard/user/list/UserListPage";
import UserRegisterPage from "./app/dashboard/user/register/UserRegisterPage";
import UserUpdatePage from "./app/dashboard/user/update/UserUpdatePage";
import TransportListPage from "./app/dashboard/transport/list/TransportListPage";
import TransportCreatePage from "./app/dashboard/transport/create/TransportCreatePage";
import TransportUpdatePage from "./app/dashboard/transport/update/TransportUpdatePage";
import DatabaseBackupPage from "./app/dashboard/config/database/DatabaseBackupPage";
import HelpPage from "./app/dashboard/help/HelpPage";
import Page404 from "./app/404/Page404";
import ForgotPassword from "./app/password/forgot/ForgotPassword";
import DashboardPage from "./app/dashboard/DashboardPage";
import RestorePassword from "./app/password/restore/RestorePassword.jsx";
import DevelopmentPage from "./_development/DevelopmentPage";
// import SystemDesignsPage from "./_dev/designs/SystemDesignsPage";

createRoot(document.getElementById("root")).render(  
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/dashboard" element={<DashboardLayout><DashboardPage /></DashboardLayout>} />

          <Route path="/dashboard/ticket/list" element={<DashboardLayout><TicketListPage /></DashboardLayout>} />
          <Route path="/dashboard/ticket/create" element={<DashboardLayout><TicketCreatePage /></DashboardLayout>} />
          <Route path="/dashboard/ticket/update/:id" element={<DashboardLayout><TicketUpdatePage /></DashboardLayout>} />
          <Route path="/dashboard/ticket/import" element={<DashboardLayout><TicketImportPage /></DashboardLayout>} />
          <Route path="/dashboard/ticket/approve/:id" element={<DashboardLayout><TicketApprovePage /></DashboardLayout>} />
          <Route path="/dashboard/ticket/:id" element={<DashboardLayout><TicketByIdPage /></DashboardLayout>} />

          <Route path="/dashboard/user/list" element={<DashboardLayout><UserListPage /></DashboardLayout>} />
          <Route path="/dashboard/user/register" element={<DashboardLayout><UserRegisterPage /></DashboardLayout>} />
          <Route path="/dashboard/user/update/:id" element={<DashboardLayout><UserUpdatePage /></DashboardLayout>} />

          <Route path="/dashboard/transport/list" element={<DashboardLayout><TransportListPage /></DashboardLayout>} />
          <Route path="/dashboard/transport/create" element={<DashboardLayout><TransportCreatePage /></DashboardLayout>} />
          <Route path="/dashboard/transport/update/:id" element={<DashboardLayout><TransportUpdatePage /></DashboardLayout>} />

          <Route path="/dashboard/config/database" element={<DashboardLayout><DatabaseBackupPage /></DashboardLayout>} />
          <Route path="/dashboard/help" element={<DashboardLayout><HelpPage /></DashboardLayout>} />

          <Route path="/dev" element={<DashboardLayout><DevelopmentPage /></DashboardLayout>} />
          {/* <Route path="/designs" element={<DashboardLayout><SystemDesignsPage /></DashboardLayout>} /> */}

          <Route path="/" element={<App />} />
          <Route path="/tikets/dist/*" element={<Navigate to="/" replace />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/restore/:emailEncrypt" element={<RestorePassword />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
