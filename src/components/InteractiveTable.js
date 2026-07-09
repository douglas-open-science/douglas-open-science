import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import tableData from '@site/src/data/tableData.json';

// =========================================================================
// 1. CONFIGURATION BLOCK (Modify your variable names & columns here!)
// =========================================================================

// Set the total number of columns for the empty-state layout span
const TOTAL_COLUMNS = 3; 

// Tell the search/filter engine which JSON key to use for the dropdown menu
const FILTER_COLUMN_KEY = 'Category'; 

// Define your layout layout. The component builds the HTML using this array.
// Supported types: 'link' (requires linkKey), 'badge', 'text'
const COLUMNS_SCHEMA = [
  //{ label: 'Name',        key: 'serviceName', type: 'link', linkKey: 'docUrl' },
  { label: 'Abbreviation', key: 'Abbreviation', type: 'text'},
  { label: 'Full Name', key: 'FullName', type: 'text'},
  { label: 'Category',    key: 'Category',    type: 'badge' },
  //{ label: 'Status',      key: 'status',      type: 'text' },
  //{ label: 'Description', key: 'description', type: 'text' },
  
  // 👇 EASILY ADD YOUR REMAINING 8 COLUMNS HERE 👇
  // { label: 'Owner',       key: 'owner',       type: 'text' },
  // { label: 'API Version', key: 'version',     type: 'badge' },
];

// =========================================================================
// 2. COMPONENT LOGIC (You don't need to modify anything below this line!)
// =========================================================================

export default function InteractiveTable() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Extract unique categories for the dropdown based on your configuration key
  const filterOptions = [
    'All', 
    ...new Set(tableData.map(item => item[FILTER_COLUMN_KEY]).filter(Boolean))
  ];

  // Filter and search logic
  const filteredData = tableData.filter(item => {
    const matchesFilter = selectedFilter === 'All' || item[FILTER_COLUMN_KEY] === selectedFilter;
    
    // Global row search
    const allRowText = Object.values(item).join(' ').toLowerCase();
    const matchesSearch = allRowText.includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div style={{ margin: '2rem 0' }}>
      
      {/* Search & Filter Controls */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder={`Search the measure table...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            flex: '1', minWidth: '250px', padding: '0.5rem', borderRadius: '4px',
            border: '1px solid var(--ifm-toc-border-color)',
            backgroundColor: 'var(--ifm-background-color)', color: 'var(--ifm-font-color-base)',
          }}
        />
        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          style={{
            padding: '0.5rem', borderRadius: '4px',
            border: '1px solid var(--ifm-toc-border-color)',
            backgroundColor: 'var(--ifm-background-color)', color: 'var(--ifm-font-color-base)',
          }}
        >
          {filterOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      </div>

      {/* Responsive Table Wrapper */}
      <div style={{ overflowX: 'auto', width: '100%' }}>
        <table style={{ width: '100%', display: 'table', minWidth: '1000px' }}>
          <thead>
            <tr>
              {/* Dynamically generates headers from your schema */}
              {COLUMNS_SCHEMA.map((col, index) => (
                <th key={index}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, rowIndex) => (
                <tr key={item.id || rowIndex}>
                  {/* Dynamically renders cells matching your schema configuration */}
                  {COLUMNS_SCHEMA.map((col, colIndex) => {
                    const cellValue = item[col.key];

                    return (
                      <td key={colIndex} style={col.type === 'link' ? { fontWeight: '600' } : {}}>
                        {col.type === 'link' && item[col.linkKey] ? (
                          <Link to={item[col.linkKey]}>{cellValue}</Link>
                        ) : col.type === 'badge' ? (
                          <span style={{
                            padding: '0.2rem 0.5rem', borderRadius: '4px',
                            backgroundColor: 'var(--ifm-color-emphasis-200)', fontSize: '0.85em'
                          }}>
                            {cellValue}
                          </span>
                        ) : (
                          cellValue
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr>
                {/* Uses the hard-coded TOTAL_COLUMNS variable to perfectly stretch the alert */}
                <td colSpan={TOTAL_COLUMNS} style={{ textAlign: 'center', color: 'var(--ifm-color-emphasis-600)' }}>
                  No results found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}