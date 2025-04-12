'use client';

import { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';

const SearchBar = ({ onFilterChange, currentFilters }) => {
  const [filters, setFilters] = useState({
    jobTitle: '',
    location: '',
    jobType: '',
    salaryRange: [500000, 1200000] 
  });

  useEffect(() => {
    if (currentFilters) {
      setFilters(currentFilters);
    }
  }, [currentFilters]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

 const handleSalaryChange = (event, newValue) => {
    const newFilters = { ...filters, salaryRange: newValue };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const formatSalary = (value) => {
    if (value >= 100000) {
      return `₹${(value / 100000).toFixed(1)}LPA`;
    }
    return `₹${value.toLocaleString()}`;
  };

  return (
    <div className="py-6 px-4 mx-auto w-full bg-white mb-6">
      <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0">
        <div className="flex items-center w-full md:w-auto">
          <SearchIcon className="text-gray-400" />
          <input
            type="text"
            name="jobTitle"
            value={filters.jobTitle}
            onChange={handleInputChange}
            placeholder="Search By Job Title, Role"
            className="ms-3 w-full md:w-60 rounded-md px-3 py-2 focus:outline-none focus:border focus:border-black"
          />
        </div>

        <div className="flex items-center w-full md:w-auto">
          <div className="hidden md:block me-8 h-8 w-0.5 bg-gray-300"></div>
          <LocationOnIcon className="text-gray-400" />
          <select
            name="location"
            value={filters.location}
            onChange={handleInputChange}
            className="ms-3 w-full md:w-60 rounded-md px-3 py-2 focus:outline-none focus:border focus:border-black"
          >
            <option value="">Preferred Location</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Chennai">Chennai</option>
            <option value="Pune">Pune</option>
            <option value="Remote">Remote</option>
          </select>
        </div>

        <div className="flex items-center w-full md:w-auto">
          <div className="hidden md:block mx-5 h-8 w-0.5 bg-gray-300"></div>
          <WorkIcon className="text-gray-400" />
          <select
            name="jobType"
            value={filters.jobType}
            onChange={handleInputChange}
            className="ms-3 w-full md:w-64 rounded-md px-3 py-2 focus:outline-none focus:border focus:border-black"
          >
            <option value="">Job Type</option>
            <option value="Full-time">Full Time</option>
            <option value="PartTime">Part Time</option>
            <option value="Internship">Internship</option>
            <option value="Contract">Contract</option>
          </select>
        </div>

        <div className="flex items-center w-full md:w-auto">
          <div className="hidden md:block mx-5 h-8 w-0.5 bg-gray-300"></div>
          <Box sx={{ width: 260 }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Salary Per Year</span>
              <span className="text-sm text-gray-600">
                {formatSalary(filters.salaryRange[0])} - {formatSalary(filters.salaryRange[1])}
              </span>
            </div>
            <Slider
              value={filters.salaryRange}
              onChange={handleSalaryChange}
              min={0}
              max={5000000}
              step={100000}
              valueLabelDisplay="off"
              sx={{
                color: '#9ca3af',
                height: 4,
                '& .MuiSlider-thumb': {
                  width: 12,
                  height: 12,
                  backgroundColor: '#000',
                },
                '& .MuiSlider-track': {
                  backgroundColor: '#000',
                },
                '& .MuiSlider-rail': {
                  backgroundColor: '#e5e7eb',
                },
              }}
            />
          </Box>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;