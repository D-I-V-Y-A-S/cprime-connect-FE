import React, { useEffect, useState } from 'react';
import './EmployeeManagement.css';

const EmployeeManagement = () => {
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await fetch('http://localhost:4010/api/v1/employees');
            if (!response.ok) throw new Error('Failed to fetch employees');
            const data = await response.json();
            setEmployees(data);
        } catch (error) {
            console.error("Error fetching employees:", error);
            setEmployees([]);
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

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
            console.error("Error searching employees:", error);
            setEmployees([]);
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
                                    <th>Role</th>
                                    <th>Date of Birth</th>
                                    <th>Email ID</th>
                                    <th>Joining Date</th>
                                    <th>Department</th>
                                    <th>Location</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map((employee) => (
                                    <tr key={employee._id}>
                                        <td>{employee.EmployeeId || "N/A"}</td>
                                        <td>{employee.EmployeeName || "N/A"}</td>
                                        <td>{employee.ReportingManager || "N/A"}</td>
                                        <td>{employee.Designation || "N/A"}</td>
                                        <td>{employee.Role || "N/A"}</td>
                                        <td>{employee.DateOfBirth || "N/A"}</td>
                                        <td>{employee.EmailId || "N/A"}</td>
                                        <td>{employee.JoiningDate || "N/A"}</td>
                                        <td>{employee.Department || "N/A"}</td>
                                        <td>{employee.Location || "N/A"}</td>
                                        <td><button className="action-button">Button</button></td>
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
