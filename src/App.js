// Import Area Start
import React from "react";
import "./App.css";
import Layout from "./layout/Layout";
import EmployeeManagement from "./Components/EmployeeDetailsManagement/EmployeeManagement"; // Import EmployeeManagement component
// Import Area End

function App() {
  return (
    <>
      <Layout />
      {/* Add the EmployeeManagement component here */}
      <EmployeeManagement />
    </>
  );
}

export default App;
