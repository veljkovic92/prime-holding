import React, { useEffect } from "react";
import { Route, Routes } from "react-router";
import Layout from "./components/layout/Layout";
import UserForm from "./components/UserForm/UserForm";

import HomePage from "./pages/Home/HomePage";
import StatisticsPage from "./pages/Statistics/StatisticsPage";
import EmployeesPage from "./pages/Employees/EmployeesPage";
import UpdateUserPage from "./pages/UpdateUser/UpdateUserPage";
import TasksPage from "./pages/Tasks/TasksPage";

function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="employees" element={<EmployeesPage />} />
          <Route
            path="employees/:employeeId/form"
            element={<UpdateUserPage />}
          />
          <Route path="employees/:employeeId/tasks" element={<TasksPage />} />
          <Route path="stats" element={<StatisticsPage />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
