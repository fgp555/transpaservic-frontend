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
import SystemDesignsPage from "./_home/designs/SystemDesignsPage.jsx";
import TicketApprovePage from "./dashboard/ticket/approve/TicketApprovePage.jsx";
import DevelopmentPage from "./_dev/DevelopmentPage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/dashboard/ticket/list" element={<DashboardLayout><TicketListPage /></DashboardLayout>} />
          <Route path="/dashboard/ticket/create" element={<DashboardLayout><TicketCreatePage /></DashboardLayout>} />
          <Route path="/dashboard/ticket/update/:id" element={<DashboardLayout><TicketUpdatePage /></DashboardLayout>} />
          <Route path="/dashboard/ticket/delete" element={<DashboardLayout><TicketDeletePage /></DashboardLayout>} />
          <Route path="/dashboard/ticket/filter" element={<DashboardLayout><TicketFilterPage /></DashboardLayout>} />
          <Route path="/dashboard/ticket/import" element={<DashboardLayout><TicketImportPage /></DashboardLayout>} />
          <Route path="/dashboard/ticket/approve" element={<DashboardLayout><TicketApprovePage /></DashboardLayout>} />

          <Route path="/dashboard/user/list" element={<DashboardLayout><UserListPage /></DashboardLayout>} />
          <Route path="/dashboard/user/register" element={<DashboardLayout><UserRegisterPage /></DashboardLayout>} />
          <Route path="/dashboard/user/update/:id" element={<DashboardLayout><UserUpdatePage /></DashboardLayout>} />
          <Route path="/dashboard/user/delete" element={<DashboardLayout><UserDeletePage /></DashboardLayout>} />

          <Route path="/dashboard/transport/list" element={<DashboardLayout><TransportListPage /></DashboardLayout>} />
          <Route path="/dashboard/transport/create" element={<DashboardLayout><TransportCreatePage /></DashboardLayout>} />
          <Route path="/dashboard/transport/update/:id" element={<DashboardLayout><TransportUpdatePage /></DashboardLayout>} />
          <Route path="/dashboard/transport/delete" element={<DashboardLayout><TransportDeletePage /></DashboardLayout>} />

          <Route path="/dashboard/municipality/list" element={<DashboardLayout><MunicipalityListPage /></DashboardLayout>} />

          <Route path="/dashboard/config/database" element={<DashboardLayout><DatabaseBackupPage /></DashboardLayout>} />
          <Route path="/dev" element={<DashboardLayout><DevelopmentPage /></DashboardLayout>} />
          <Route path="/designs" element={<DashboardLayout><SystemDesignsPage /></DashboardLayout>} />
          
          {/* <Route path="/" element={<PublicLayout><App /></PublicLayout>} /> */}
          <Route path="/" element={<App />} />
          <Route path="/login" element={<PublicLayout><App /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
          <Route path="/dashboard" element={<DashboardLayout><DashboardPage /></DashboardLayout>} />
          <Route path="*" element={<PublicLayout><Page404 /></PublicLayout>} />
        </Routes>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
