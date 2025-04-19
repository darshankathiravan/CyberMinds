'use client';

import { useEffect, useState } from 'react';
import JobCard from '../components/JobCard';
import SearchBar from '../components/SearchBar';
import axios from 'axios';
import { JOB_POSTED_EVENT } from '../components/CreateJobForm';

export default function Home() {
  const [jobs, setJobs] = useState({ data: [] });
  const [filters, setFilters] = useState({
    jobTitle: '',
    location: '',
    jobType: '',
  });

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetchJobs();
    window.addEventListener(JOB_POSTED_EVENT, handleJobPosted);

    return () => {
      window.removeEventListener(JOB_POSTED_EVENT, handleJobPosted);
    };
  }, []);

  const handleJobPosted = () => {
    console.log('New job posted, refreshing job list');
    fetchJobs();
  };

  const fetchJobs = async (queryParams = '') => {
    try {
      const response = await axios.get(`${apiUrl}/jobs${queryParams}`);
      setJobs(response.data);
    } catch (err) {
      console.error('Failed to fetch jobs:', err);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);

    let queryParams = '/search?';
    const params = [];

    if (newFilters.jobTitle) {
      params.push(`title=${encodeURIComponent(newFilters.jobTitle)}`);
    }

    if (newFilters.location) {
      params.push(`location=${encodeURIComponent(newFilters.location)}`);
    }

    if (newFilters.jobType) {
      params.push(`jobtype=${encodeURIComponent(newFilters.jobType)}`);
    }

    queryParams += params.join('&');

    // If no filters are applied, get all jobs
    if (params.length === 0) {
      fetchJobs();
    } else {
      fetchJobs(queryParams);
    }
  };

  return (
    <main>
      <SearchBar onFilterChange={handleFilterChange} currentFilters={filters} />

      {jobs.data && jobs.data.length > 0 ? (
        <div className="mx-auto">
          <div className="grid grid-cols-1 gap-4 mx-4 md:grid-cols-2 xl:grid-cols-4 md:mx-24">
            {jobs.data.map((job, index) => (
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
