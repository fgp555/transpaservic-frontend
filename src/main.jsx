import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { Provider } from "react-redux";
import store from "./store/reduxStore.js";
import "./index.css"; 

import App from "./App.jsx";
import DashboardLayout from "./app/dashboard/_layout/DashboardLayout";
import OrderListPage from "./app/dashboard/order/list/OrderListPage";
import OrderCreatePage from "./app/dashboard/order/create/OrderCreatePage";
import OrderUpdatePage from "./app/dashboard/order/update/OrderUpdatePage";
import OrderImportPage from "./app/dashboard/order/import/OrderImportPage";
import OrderByIdPage from "./app/dashboard/order/id/OrderByIdPage";
import UserListPage from "./app/dashboard/user/list/UserListPage";
import UserRegisterPage from "./app/dashboard/user/register/UserRegisterPage";
import UserUpdatePage from "./app/dashboard/user/update/UserUpdatePage";
import OperatorListPage from "./app/dashboard/operator/list/OperatorListPage";
import OperatorCreatePage from "./app/dashboard/operator/create/OperatorCreatePage";
import OperatorUpdatePage from "./app/dashboard/operator/update/OperatorUpdatePage";
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

          <Route path="/dashboard/order/list" element={<DashboardLayout><OrderListPage /></DashboardLayout>} />
          <Route path="/dashboard/order/create" element={<DashboardLayout><OrderCreatePage /></DashboardLayout>} />
          <Route path="/dashboard/order/update/:id" element={<DashboardLayout><OrderUpdatePage /></DashboardLayout>} />
          <Route path="/dashboard/order/import" element={<DashboardLayout><OrderImportPage /></DashboardLayout>} />
          <Route path="/dashboard/order/:id" element={<DashboardLayout><OrderByIdPage /></DashboardLayout>} />

          <Route path="/dashboard/user/list" element={<DashboardLayout><UserListPage /></DashboardLayout>} />
          <Route path="/dashboard/user/register" element={<DashboardLayout><UserRegisterPage /></DashboardLayout>} />
          <Route path="/dashboard/user/update/:id" element={<DashboardLayout><UserUpdatePage /></DashboardLayout>} />

          <Route path="/dashboard/operator/list" element={<DashboardLayout><OperatorListPage /></DashboardLayout>} />
          <Route path="/dashboard/operator/create" element={<DashboardLayout><OperatorCreatePage /></DashboardLayout>} />
          <Route path="/dashboard/operator/update/:id" element={<DashboardLayout><OperatorUpdatePage /></DashboardLayout>} />

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
