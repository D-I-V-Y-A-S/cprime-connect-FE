import React, { useState } from 'react';
import { useApi } from "../../hooks/useApi";

const AddCandidatesComponent = () => {
    const { request } = useApi();
    const [formData, setFormData] = useState({
        Emp_id: '',
        Name: '',
        Email_id_official: '',
        Designation: '',
        Reporting_Manager: '',
        Email_id_personal: '',
        DOB: '',
        Mobile_no: '',
        Department: '',
        Location: '',
      });
    
      // Department options from the schema
      
    
      // Handle form data change
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      // Handle form submission
      const handleSubmit = async(e) => {
        e.preventDefault();
        console.log('Form submitted successfully', formData);
        const res = await request({
            method: "POST",
            url: "/add_candidate",
            headers: {
              "Content-Type": "application/json",
            },
            data:{ formData}// Convert formData to JSON string
          });
          if(res.status==200){
            console.log("Added")
          }
        // Optionally reset form data
        setFormData({
          Emp_id: '',
          Name: '',
          Email_id_official: '',
          Designation: '',
          Reporting_Manager: '',
          Email_id_personal: '',
          DOB: '',
          Mobile_no: '',
          Department: '',
          Location: '',
        });
        window.location.href = '/onboard'
      };
    
      return (
        <div className="add-candidate-form">
          <h2>Add New Candidate</h2>
          <form onSubmit={handleSubmit}>
            {/* Employee ID */}
            <div>
              <label>Employee ID:</label>
              <input
                type="text"
                name="Emp_id"
                value={formData.Emp_id}
                onChange={handleChange}
                required
              />
            </div>
    
            {/* Name */}
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="Name"
                value={formData.Name}
                onChange={handleChange}
                required
              />
            </div>
    
            {/* Official Email */}
            <div>
              <label>Official Email ID:</label>
              <input
                type="email"
                name="Email_id_official"
                value={formData.Email_id_official}
                onChange={handleChange}
                pattern="^[a-z]+\.[a-z]+@cprime\.com$"
                required
              />
            </div>
    
            {/* Designation */}
            <div>
              <label>Designation:</label>
              <input
                type="text"
                name="Designation"
                value={formData.Designation}
                onChange={handleChange}
                required
              />
            </div>
    
            {/* Reporting Manager */}
            <div>
              <label>Reporting Manager:</label>
              <input
                type="text"
                name="Reporting_Manager"
                value={formData.Reporting_Manager}
                onChange={handleChange}
                required
              />
            </div>
    
            {/* Personal Email */}
            <div>
              <label>Personal Email ID:</label>
              <input
                type="email"
                name="Email_id_personal"
                value={formData.Email_id_personal}
                onChange={handleChange}
                pattern="^[a-zA-Z]+\d*\.[a-zA-Z]+\d*@\w+\.\w+$"
                required
              />
            </div>
    
            {/* Date of Birth */}
            <div>
              <label>Date of Birth:</label>
              <input
                type="date"
                name="DOB"
                value={formData.DOB}
                onChange={handleChange}
                required
              />
            </div>
    
            {/* Mobile Number */}
            <div>
              <label>Mobile Number:</label>
              <input
                type="text"
                name="Mobile_no"
                value={formData.Mobile_no}
                onChange={handleChange}
                pattern="^\d{10}$"
                required
              />
            </div>
    
            {/* Department */}
            <div>
              <label>Department:</label>
              <input
                name="Department"
                value={formData.Department}
                onChange={handleChange}
                required
              >
              </input>
            </div>
    
            {/* Location */}
            <div>
              <label>Location:</label>
              <input
                type="text"
                name="Location"
                value={formData.Location}
                onChange={handleChange}
                required
              />
            </div>
    
            <button type="submit">Add Candidate</button>
          </form>
        </div>
      );
}

export default AddCandidatesComponent
