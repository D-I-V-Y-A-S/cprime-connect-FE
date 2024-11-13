import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useApi } from "../../hooks/useApi";

const EditCandidate = () => {
  const { request } = useApi();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const candidateData = queryParams.get('data');
  const candidate = candidateData ? JSON.parse(atob(candidateData)) : null;

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

  useEffect(() => {
    if (candidate) {
      setFormData({
        Emp_id: candidate.Emp_id || '',
        Name: candidate.Name || '',
        Email_id_official: candidate.Email_id_official || '',
        Designation: candidate.Designation || '',
        Reporting_Manager: candidate.Reporting_Manager || '',
        Email_id_personal: candidate.Email_id_personal || '',
        DOB: candidate.DOB || '', // Assuming DOB is in ISO format
        Mobile_no: candidate.Mobile_no || '',
        Department: candidate.Department || '',
        Location: candidate.Location || '',
      });
    }
  }, []);

  // Function to format date to YYYY-MM-DD
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
    // Add your submission logic here (e.g., API request)
    const res = await request({
      method: "POST",
      url: "/edit_candidate",
      headers: {
        "Content-Type": "application/json",
      },
      data:{ formData}
    });
    console.log(res.status)
    if(res.status==200){
      console.log("Added")
    }
    else{
      console.log(res.status)
    }
     window.location.href = '/onboard'
  };

  return (
    <div className="edit-candidate-form">
      <h2>Edit Candidate Details</h2>
      {candidate ? (
        <form onSubmit={handleSubmit}>
          {/* Employee ID */}
          <div>
            <label>Employee ID:</label>
            <input
              type="text"
              name="Emp_id"
              value={formData.Emp_id}
              onChange={(e) => setFormData({ ...formData, Emp_id: e.target.value })}
              readOnly
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
              onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
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
              onChange={(e) => setFormData({ ...formData, Email_id_official: e.target.value })}
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
              onChange={(e) => setFormData({ ...formData, Email_id_personal: e.target.value })}
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
              onChange={(e) => setFormData({ ...formData, Designation: e.target.value })}
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
              onChange={(e) => setFormData({ ...formData, Reporting_Manager: e.target.value })}
              required
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label>Date of Birth:</label>
            <input
              type="date"
              name="DOB"
              value={formData.DOB ? formatDate(formData.DOB) : ''}
              onChange={(e) => setFormData({ ...formData, DOB: e.target.value })}
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
              onChange={(e) => setFormData({ ...formData, Mobile_no: e.target.value })}
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
              onChange={(e) => setFormData({ ...formData, Department: e.target.value })}
              required
            />
   
          </div>

          {/* Location */}
          <div>
            <label>Location:</label>
            <input
              type="text"
              name="Location"
              value={formData.Location}
              onChange={(e) => setFormData({ ...formData, Location: e.target.value })}
              required
            />
          </div>

          <button type="submit">Save Changes</button>
        </form>
      ) : (
        <p>No candidate data available.</p>
      )}
    </div>
  );
};

export default EditCandidate;
