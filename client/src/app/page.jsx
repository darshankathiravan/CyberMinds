'use client';

import { useEffect, useState } from 'react';
import JobCard from '../components/JobCard';
import SearchBar from '../components/SearchBar';
import Topbar from '../components/Topbar';
import axios from 'axios';

export default function Home() {
  const [jobs, setJobs] = useState({ data: [] });
  const [filteredJobs, setFilteredJobs] = useState({ data: [] });
  const [filters, setFilters] = useState({
    jobTitle: '',
    location: '',
    jobType: '',
    salaryRange: [0, 5000000] 
  });

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  useEffect(() => {
    axios.get(`${apiUrl}/jobs/`) 
      .then((res) => {
        setJobs(res.data);
        setFilteredJobs(res.data);
      })
      .catch((err) => {
        console.error('Failed to fetch jobs:', err);
      });
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    
    if (jobs.data) {
      const filtered = jobs.data.filter(job => {
        if (newFilters.jobTitle && 
            !job.title.toLowerCase().includes(newFilters.jobTitle.toLowerCase())) {
          return false;
        }
        
        if (newFilters.location && job.location !== newFilters.location) {
          return false;
        }
        
        if (newFilters.jobType && job.jobtype !== newFilters.jobType) {
          return false;
        }
        
        const jobMinSalary = job.min_salary || 0;
        const jobMaxSalary = job.max_salary || 0;
        
        if (jobMaxSalary < newFilters.salaryRange[0] || 
            jobMinSalary > newFilters.salaryRange[1]) {
          return false;
        }
        
        return true;
      });
      
      setFilteredJobs({ data: filtered });
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <SearchBar onFilterChange={handleFilterChange} currentFilters={filters} />
      
      {filteredJobs.data && filteredJobs.data.length > 0 ? (
        <div className="mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-4 md:mx-24">
            {filteredJobs.data.map((job, index) => (
              <JobCard key={index} {...job} />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No jobs found matching your criteria.</p>
        </div>
      )}
    </main>
  );
}