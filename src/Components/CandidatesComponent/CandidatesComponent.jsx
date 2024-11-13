import React, { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import DisplayCandidate from "./DisplayCandidate";
import "./CandidatesComponent.css";
import { useNavigate } from "react-router-dom";
import { Link, Navigate } from "react-router-dom";
import AddCandidatesComponent from "./AddCandidatesComponent";

const CandidatesComponent = () => {
  const navigate = useNavigate();
  const { request } = useApi();
  const [search, setsearch] = useState("");
  const [candidate, setcandidate] = useState([]);
  const [filteredCandidate, setfilteredCandidate] = useState({});
  
  const get_candidate = async () => {
    const response = await request({
      method: "GET",
      url: "/get_candidate",
    });
    console.log(response);
    setcandidate(response);
  };

  const handleAddCandidateClick = () => {
    navigate('/add_candidate'); // Navigate to the Add Candidate page
  };

  const handleSearchChange = async (event) => {
    setsearch(event.target.value);
    console.log(search);
    const res = await request({
      method: "GET",
      url: `/search_candidate/${search}`,
    });
    setfilteredCandidate(res);
    console.log(res);
    console.log(filteredCandidate);
  };

  useEffect(() => {
    get_candidate();
  }, []);

  return (
    <React.Fragment>

      <button onClick={handleAddCandidateClick} className="add-candidate-button">
        Add Candidate
      </button>

      {/* search-feature */}
      <div className="search-container">
        <div className="search-icon"></div>
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          className="search-input"
          placeholder="Search by name..."
        />
      </div>

      {/* table */}
      <table border="1" cellSpacing="0" cellPadding="5" margin="3">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Location</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Reporting Manager</th>
            <th>Mobile Number</th>
            <th>Official Email ID</th>
            <th>Personal Email ID</th>
            <th>Date of Birth</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {
            // First check if filteredCandidate has data
            filteredCandidate && filteredCandidate.length > 0 ? (
              filteredCandidate.map((candidateItem) => (
                <DisplayCandidate
                  candidate={candidateItem}
                  key={candidateItem.Emp_id}
                />
              ))
            ) : filteredCandidate && filteredCandidate.length === 0 ? (
              // If filteredCandidate is empty
              <tr>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  No match found
                </td>
              </tr>
            ) : candidate && candidate.length > 0 ? (
              // If filteredCandidate is empty, fallback to candidate data
              candidate.map((candidateItem) => (
                <DisplayCandidate
                  candidate={candidateItem}
                  key={candidateItem.Emp_id}
                />
              ))
            ) : (
              <tr>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  No candidates available
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </React.Fragment>
  );
};
export default CandidatesComponent;
