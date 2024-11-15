import React, { useEffect, useState } from 'react';
import './EmployeeManagement.css';

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editIndex, setEditIndex] = useState(null); // Track the index of the employee being edited
  const [editingEmployee, setEditingEmployee] = useState(null); // Track the employee data being edited

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Fetch employees from the backend
  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:4010/api/v1/employees');
      if (!response.ok) throw new Error('Failed to fetch employees');
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
      setEmployees([]);
    }
  };

  // Handle search input changes
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Search employees
  const searchEmployees = async () => {
    if (!searchTerm) {
      fetchEmployees();
      return;
    }
    try {
      const response = await fetch(`http://localhost:4010/api/v1/employees/search/${searchTerm}`);
      if (!response.ok) throw new Error('Failed to search employees');
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error searching employees:', error);
      setEmployees([]);
    }
  };

  // Handle the edit button click
  const handleEditClick = (index) => {
    if (editIndex === index) {
      // If already editing, save the changes
      saveEmployee(editingEmployee);
    } else {
      // Set the current employee to be edited
      setEditIndex(index);
      setEditingEmployee({ ...employees[index] });
    }
  };

  // Handle input changes while editing
  const handleInputChange = (event, field) => {
    setEditingEmployee({
      ...editingEmployee,
      [field]: event.target.value,
    });
  };

  // Save the updated employee data to the backend
  const saveEmployee = async (updatedEmployee) => {
    try {
        console.log(updatedEmployee.EmployeeId)
      const response = await fetch(`http://localhost:4010/api/v1/employees/edit`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEmployee),
      });

      if (!response.ok) throw new Error('Failed to update employee');

      // Re-fetch the employees after updating to reflect the changes
      fetchEmployees();

      setEditIndex(null); // Exit editing mode
      setEditingEmployee(null); // Clear the edited employee data
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  return (
    <div className="page-container">
      <aside className="sidebar">
        <div className="logo">cprime</div>
        <nav className="nav-menu">
          <a href="#dashboard">Dashboard</a>
          <a href="#onboarding">Onboarding</a>
          <a href="#employee" className="active">Employee</a>
          <a href="#attendance">Attendance</a>
          <a href="#payroll">Payroll</a>
          <a href="#performance">Performance</a>
          <a href="#offboarding">Offboarding</a>
          <a href="#assets">Assets</a>
          <a href="#policies">Policies</a>
          <a href="#helpdesk">Helpdesk</a>
        </nav>
      </aside>

      <main className="content">
        <header className="header">
          <input
            type="text"
            placeholder="Search Cprime"
            className="header-search"
          />
          <div className="header-profile">S</div>
        </header>

        <section className="employee-management-section">
          <h1 className="title">Employee Record Management</h1>

          <div className="search-bar">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search employees..."
              className="search-input"
            />
            <button onClick={searchEmployees} className="search-button">Search</button>
          </div>

          <div className="table-container">
            <table className="employee-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Reporting Manager</th>
                  <th>Designation</th>
                  <th>Date of Birth</th>
                  <th>Email ID</th>
                  <th>Joining Date</th>
                  <th>Department</th>
                  <th>Location</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee, index) => (
                  <tr key={employee._id}>
                    <td>
                      {editIndex === index ? (
                        <input
                          value={editingEmployee?.EmployeeId || ''}
                          onChange={(e) => handleInputChange(e, 'EmployeeId')}
                        />
                      ) : (
                        employee.EmployeeId || 'N/A'
                      )}
                    </td>
                    <td>
                      {editIndex === index ? (
                        <input
                          value={editingEmployee?.EmployeeName || ''}
                          onChange={(e) => handleInputChange(e, 'EmployeeName')}
                        />
                      ) : (
                        employee.EmployeeName || 'N/A'
                      )}
                    </td>
                    <td>
                      {editIndex === index ? (
                        <input
                          value={editingEmployee?.ReportingManager || ''}
                          onChange={(e) => handleInputChange(e, 'ReportingManager')}
                        />
                      ) : (
                        employee.ReportingManager || 'N/A'
                      )}
                    </td>
                    <td>
                      {editIndex === index ? (
                        <input
                          value={editingEmployee?.Designation || ''}
                          onChange={(e) => handleInputChange(e, 'Designation')}
                        />
                      ) : (
                        employee.Designation || 'N/A'
                      )}
                    </td>
                    <td>
                      {editIndex === index ? (
                        <input
                          value={editingEmployee?.DateOfBirth || ''}
                          onChange={(e) => handleInputChange(e, 'DateOfBirth')}
                        />
                      ) : (
                        employee.DateOfBirth || 'N/A'
                      )}
                    </td>
                    <td>
                      {editIndex === index ? (
                        <input
                          value={editingEmployee?.EmailId || ''}
                          onChange={(e) => handleInputChange(e, 'EmailId')}
                        />
                      ) : (
                        employee.EmailId || 'N/A'
                      )}
                    </td>
                    <td>
                      {editIndex === index ? (
                        <input
                          value={editingEmployee?.JoiningDate || ''}
                          onChange={(e) => handleInputChange(e, 'JoiningDate')}
                        />
                      ) : (
                        employee.JoiningDate || 'N/A'
                      )}
                    </td>
                    <td>
                      {editIndex === index ? (
                        <input
                          value={editingEmployee?.Department || ''}
                          onChange={(e) => handleInputChange(e, 'Department')}
                        />
                      ) : (
                        employee.Department || 'N/A'
                      )}
                    </td>
                    <td>
                      {editIndex === index ? (
                        <input
                          value={editingEmployee?.Location || ''}
                          onChange={(e) => handleInputChange(e, 'Location')}
                        />
                      ) : (
                        employee.Location || 'N/A'
                      )}
                    </td>
                    <td>
                      <button onClick={() => handleEditClick(index)} className="action-button">
                        {editIndex === index ? 'Save' : 'Edit'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <footer className="footer">
          © 2024 Cprime, Inc. All rights Reserved. Terms & Conditions, Privacy Policy, Cookie Policy
        </footer>
      </main>
    </div>
  );
};

export default EmployeeManagement;
