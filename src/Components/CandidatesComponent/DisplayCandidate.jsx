import React from "react";
import { Link } from "react-router-dom";

const DisplayCandidates = ({ candidate}) => {
  
  const encodeCandidateData = (candidate) => {
    return btoa(JSON.stringify(candidate)); // Base64 encode the candidate data
  };
  
  return (
    <tr>
      <td>{candidate.Emp_id}</td>
      <td>{candidate.Name}</td>
      <td>{candidate.Location}</td>
      <td>{candidate.Department}</td>
      <td>{candidate.Designation}</td>
      <td>{candidate.Reporting_Manager}</td>
      <td>{candidate.Mobile_no}</td>
      <td>{candidate.Email_id_official}</td>
      <td>{candidate.Email_id_personal}</td>
      <td>{new Date(candidate.DOB).toLocaleDateString()}</td>
      <td>
        <Link to={`/edit_candidate?data=${encodeCandidateData(candidate)}`}>
          Edit
        </Link>
      </td>
    </tr>
  )
}

export default DisplayCandidates;
