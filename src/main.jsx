import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import { Provider } from "react-redux";
import store from "./store/store.js";

import About from "./_home/about/About";
import { PublicLayout } from "./_home/_components/layouts/PublicLayout";
import DashboardLayout from "./dashboard/_components/layout/DashboardLayout";
import DashboardPage from "./dashboard/_/DashboardPage";
import Page404 from "./_home/404/Page404";
import UserRegisterPage from "./dashboard/user/register/UserRegisterPage";
import TicketListPage from "./dashboard/ticket/list/TicketListPage";
import UserListPage from "./dashboard/user/list/UserListPage";
import TicketCreatePage from "./dashboard/ticket/create/TicketCreatePage";
import TicketUpdatePage from "./dashboard/ticket/update/TicketUpdatePage";
import TicketDeletePage from "./dashboard/ticket/delete/TicketDeletePage";
import TransportCreatePage from "./dashboard/transport/create/TransportCreatePage";
import TransportListPage from "./dashboard/transport/list/TransportListPage";
import TransportUpdatePage from "./dashboard/transport/update/TransportUpdatePage";
import TransportDeletePage from "./dashboard/transport/delete/TransportDeletePage";
import UserDeletePage from "./dashboard/user/delete/UserDeletePage";
import UserUpdatePage from "./dashboard/user/update/UserUpdatePage";
import TicketImportPage from "./dashboard/ticket/import/TicketImportPage";
import TicketFilterPage from "./dashboard/ticket/filter/TicketFilterPage";
import MunicipalityListPage from "./dashboard/municipality/list/MunicipalityListPage";
import DatabaseBackupPage from "./dashboard/config/database/DatabaseBackupPage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/dashboard/ticket/list" element={<PublicLayout><TicketListPage /></PublicLayout>} />
          <Route path="/dashboard/ticket/create" element={<PublicLayout><TicketCreatePage /></PublicLayout>} />
          <Route path="/dashboard/ticket/update/:id" element={<PublicLayout><TicketUpdatePage /></PublicLayout>} />
          <Route path="/dashboard/ticket/delete" element={<PublicLayout><TicketDeletePage /></PublicLayout>} />
          <Route path="/dashboard/ticket/filter" element={<PublicLayout><TicketFilterPage /></PublicLayout>} />
          <Route path="/dashboard/ticket/import" element={<PublicLayout><TicketImportPage /></PublicLayout>} />

          <Route path="/dashboard/user/list" element={<PublicLayout><UserListPage /></PublicLayout>} />
          <Route path="/dashboard/user/register" element={<PublicLayout><UserRegisterPage /></PublicLayout>} />
          <Route path="/dashboard/user/update/:id" element={<PublicLayout><UserUpdatePage /></PublicLayout>} />
          <Route path="/dashboard/user/delete" element={<PublicLayout><UserDeletePage /></PublicLayout>} />

          <Route path="/dashboard/transport/list" element={<PublicLayout><TransportListPage /></PublicLayout>} />
          <Route path="/dashboard/transport/create" element={<PublicLayout><TransportCreatePage /></PublicLayout>} />
          <Route path="/dashboard/transport/update/:id" element={<PublicLayout><TransportUpdatePage /></PublicLayout>} />
          <Route path="/dashboard/transport/delete" element={<PublicLayout><TransportDeletePage /></PublicLayout>} />

          <Route path="/dashboard/municipality/list" element={<PublicLayout><MunicipalityListPage /></PublicLayout>} />
          <Route path="/dashboard/config/database" element={<PublicLayout><DatabaseBackupPage /></PublicLayout>} />
          
          <Route path="/" element={<PublicLayout><App /></PublicLayout>} />
          <Route path="/login" element={<PublicLayout><App /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
          <Route path="/dashboard" element={<DashboardLayout><DashboardPage /></DashboardLayout>} />
          <Route path="*" element={<PublicLayout><Page404 /></PublicLayout>} />
        </Routes>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
