import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Tree, TreeNode } from 'react-organizational-chart';
import './OrgChartComponent.css';

const OrgChart = () => {
  const [orgData, setOrgData] = useState(null);
  const [expandedNodes, setExpandedNodes] = useState({});

  useEffect(() => {
    axios.get('http://localhost:4000/api/v1/org-chart') // Assuming the backend API is running locally
      .then(response => {
        setOrgData(response.data);
      })
      .catch(error => console.error('Error fetching org chart data:', error));
  }, []);

  const convertToTreeFormat = useCallback((data) => {
    return data.map(item => ({
      name: item.EmployeeName,
      designation: item.Designation,
      employeeId: item.EmployeeId, // Add employee ID to access photos
      subordinates: item.subordinates ? convertToTreeFormat(item.subordinates) : [],
    }));
  }, []);

  const toggleNodeExpansion = (nodeName) => {
    setExpandedNodes(prevState => ({
      ...prevState,
      [nodeName]: !prevState[nodeName],
    }));
  };

  const renderTreeNodes = (node) => {
    const isExpanded = expandedNodes[node.name]; // Check if node is expanded
    const subordinatesCount = node.subordinates ? node.subordinates.length : 0; // Count of subordinates

    // Construct the photo URL path based on employee ID
    const photoUrl = `/photos/${node.employeeId}.jpg`; 

    return (
      <TreeNode
        key={node.name}
        className="tree"
        label={
          <div className="node-box" onClick={() => toggleNodeExpansion(node.name)}>
            <div className="node-photo-container">
              <img 
                src={photoUrl} 
                alt={`${node.name}'s photo`} 
                className="node-photo" 
                onError={(e) => e.target.src = '/photos/default.jpg'} // Fallback image if not found
              />
            </div>
            <div className="node-text-name">{node.name}</div>
            <div className="node-text-designation">{node.designation}</div>
            <div className="node-text-subordinates">
              {subordinatesCount > 0 ? `Direct Reports: ${subordinatesCount}` : 'Direct Reports: 0'}
            </div>
          </div>
        }
      >
        {isExpanded && node.subordinates && node.subordinates.map((subordinate) => renderTreeNodes(subordinate))}
      </TreeNode>
    );
  };

  return (
    <div className="org-chart-container">
      <h1>ORGANIZATION CHART</h1>
      {orgData ? (
        convertToTreeFormat(orgData).map((rootNode, index) => (
          <Tree
            key={index}
            lineWidth="2px"
            lineColor="black"
            lineBorderRadius="10px"
            label={
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                <img 
                  src="https://exalate.com/wp-content/uploads/2019/10/logo-coral.png" 
                  alt="Organization Logo" 
                  style={{ width: '300px', height: '100px' }}
                />
              </div>
            }
          >
            {renderTreeNodes(rootNode)}
          </Tree>
        ))
      ) : <p>Loading...</p>}
    </div>
  );
};

export default OrgChart;
