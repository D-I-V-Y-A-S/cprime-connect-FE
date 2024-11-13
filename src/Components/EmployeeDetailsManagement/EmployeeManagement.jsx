import React, { useEffect, useState } from 'react';
import './EmployeeManagement.css';

const EmployeeManagement = () => {
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingEmployee, setEditingEmployee] = useState(null);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        const response = await fetch('http://localhost:4010/api/v1/employees');
        const data = await response.json();
        setEmployees(data);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const searchEmployees = async () => {
        if (!searchTerm) {
            fetchEmployees();
            return;
        }
        const response = await fetch(`http://localhost:4010/api/v1/employees/search/${searchTerm}`);
        const data = await response.json();
        setEmployees(data);
    };

    const handleEdit = (employee) => {
        setEditingEmployee(employee);
    };

    const handleEditChange = (event) => {
        const { name, value } = event.target;
        setEditingEmployee((prevEmployee) => ({
            ...prevEmployee,
            [name]: value,
        }));
    };

    const handleUpdate = async () => {
        const response = await fetch(`http://localhost:4010/api/v1/employees/edit`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editingEmployee),
        });
        const data = await response.json();
        if (data) {
            fetchEmployees();
            setEditingEmployee(null);
        }
    };

    return (
        <div className="employee-management">
            <h1 className="title">Employee Management</h1>
            
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

            <h2 className="subtitle">Employee List</h2>
            <table className="employee-table">
                <thead>
                    <tr>
                        <th>EmployeeId</th>
                        <th>EmployeeName</th>
                        <th>ReportingManager</th>
                        <th>Designation</th>
                        <th>Role</th>
                        <th>DateOfBirth</th>
                        <th>EmailId</th>
                        <th>JoiningDate</th>
                        <th>Department</th>
                        <th>Location</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee._id}>
                            <td>{employee.EmployeeId}</td>
                            <td>{employee.EmployeeName}</td>
                            <td>{employee.ReportingManager}</td>
                            <td>{employee.Designation}</td>
                            <td>{employee.Role}</td>
                            <td>{new Date(employee.DateOfBirth).toLocaleDateString()}</td>
                            <td>{employee.EmailId}</td>
                            <td>{new Date(employee.JoiningDate).toLocaleDateString()}</td>
                            <td>{employee.Department}</td>
                            <td>{employee.Location}</td>
                            <td>
                                <button onClick={() => handleEdit(employee)} className="edit-button">Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editingEmployee && (
    <div className="edit-form">
        <h3>Edit Employee</h3>

        <label htmlFor="EmployeeName">Employee Name</label>
        <input
            type="text"
            name="EmployeeName"
            value={editingEmployee.EmployeeName}
            onChange={handleEditChange}
            placeholder="Employee Name"
        />

        <label htmlFor="Designation">Designation</label>
        <input
            type="text"
            name="Designation"
            value={editingEmployee.Designation}
            onChange={handleEditChange}
            placeholder="Designation"
        />

        <label htmlFor="Role">Role</label>
        <input
            type="text"
            name="Role"
            value={editingEmployee.Role}
            onChange={handleEditChange}
            placeholder="Role"
        />

        <label htmlFor="EmailId">Email ID</label>
        <input
            type="email"
            name="EmailId"
            value={editingEmployee.EmailId}
            onChange={handleEditChange}
            placeholder="Email ID"
        />

        <button onClick={handleUpdate}>Update</button>
    </div>
)}
        </div>
    );
};

export default EmployeeManagement;
