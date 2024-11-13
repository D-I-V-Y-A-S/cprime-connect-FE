import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Tree, TreeNode } from 'react-organizational-chart';
import './OrgChartComponent.css';

const OrgChart = () => {
  const [orgData, setOrgData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:4000/api/v1/org-chart')
      .then(response => {
        setOrgData(response.data);  // Assuming the response is the organization data
      })
      .catch(error => console.error('Error fetching org chart data:', error));
  }, []);

  const convertToTreeFormat = useCallback((data) => {
    return data.map(item => ({
      name: item.EmployeeName,
      designation: item.Designation,
      subordinates: item.subordinates ? convertToTreeFormat(item.subordinates) : [],
    }));
  }, []);

  const renderTreeNodes = (node) => {
    return (
      <TreeNode className='tree'
        key={node.name}
        label={
          <div className="node-box">
            <div className="node-text-name">{node.name}</div>
            <div className="node-text-designation">{node.designation}</div>
          </div>
        }
      >
        {node.subordinates && node.subordinates.map((subordinate) => renderTreeNodes(subordinate))}
      </TreeNode>
    );
  };

  return (
    <div className="org-chart-container">
      <h2>Organization Chart</h2>
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
                  style={{ width: '150px', height: '50px' }}
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
