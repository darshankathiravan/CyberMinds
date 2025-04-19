'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';

const SearchBar = ({ onFilterChange, currentFilters }) => {
  const [filters, setFilters] = useState({
    jobTitle: '',
    location: '',
    jobType: '',
    salaryRange: [50000, 80000],
  });

  useEffect(() => {
    if (currentFilters) {
      setFilters({
        ...currentFilters,
        salaryRange: filters.salaryRange,
      });
    }
  }, [currentFilters]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);

    const apiFilters = {
      jobTitle: newFilters.jobTitle,
      location: newFilters.location,
      jobType: newFilters.jobType,
    };

    onFilterChange(apiFilters);
  };

  const handleSalaryChange = (event, newValue) => {
    setFilters({ ...filters, salaryRange: newValue });
  };

  const formatSalary = (value) => {
    if (value >= 100000) {
      return `₹${(value / 100000).toFixed(1)}k`;
    }
    return `₹${value.toLocaleString()}`;
  };

  return (
    <div className="py-6 px-4 w-full shadow-xs mb-6">

      <div className="flex flex-col lg:flex-row justify-center space-y-4 lg:space-y-0 ">
        <div className="flex items-center w-full lg:w-auto">
          <div>
            <Image
              src="/assets/topbar/search.svg"
              alt="Search"
              width={24}
              height={24}
            />
          </div>
          <input
            type="text"
            name="jobTitle"
            value={filters.jobTitle}
            onChange={handleInputChange}
            placeholder="Search By Job Title, Role"
            className="ms-3 w-full md:w-60 rounded-md px-3 py-2 focus:outline-none focus:border focus:border-black"
          />
        </div>

        <div className="flex items-center w-full lg:w-auto font-extralight text-gray-500">
          <div className="hidden lg:block me-8 h-8 w-0.5 bg-gray-300"></div>
          <div className="text-gray-400">
            <Image
              src="/assets/topbar/location.svg"
              alt="Location"
              width={16}
              height={21}
            />
          </div>
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

        <div className="flex items-center w-full lg:w-auto text-gray-500">
          <div className="hidden lg:block mx-5 h-8 w-0.5 bg-gray-300"></div>
          <div className="text-gray-400">
            <Image
              src="/assets/topbar/jobtype.svg"
              alt="Job Type"
              width={18}
              height={16}
            />
          </div>
          <select
            name="jobType"
            value={filters.jobType}
            onChange={handleInputChange}
            className="ms-3 w-full md:w-64 rounded-md px-3 py-2 focus:outline-none focus:border focus:border-black"
          >
            <option value="">Job Type</option>
            <option value="fulltime">Full-time</option>
            <option value="parttime">Part-time</option>
            <option value="internship">Internship</option>
            <option value="contract">Contract</option>
          </select>
        </div>

        <div className="flex items-center w-full lg:w-auto">
          <div className="hidden lg:block mx-5 h-8 w-0.5 bg-gray-300"></div>
          <Box sx={{ width: 260 }}>
            <div className="flex items-center justify-between mb-2 font-medium">
              <span className="text-sm">Salary Per Year</span>
              <span className="text-sm">
                {formatSalary(filters.salaryRange[0])} -{' '}
                {formatSalary(filters.salaryRange[1])}
              </span>
            </div>
            <Slider
              value={filters.salaryRange}
              onChange={handleSalaryChange}
              min={0}
              max={100000}
              step={5000}
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
