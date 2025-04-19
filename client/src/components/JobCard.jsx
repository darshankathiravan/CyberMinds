'use client';

import Image from 'next/image';
import { Button } from '@mui/material';

// Company logos remain in their current folder since they're company specific
const companyLogos = {
  amazon: '/assets/company-logos/amazon.svg',
  tesla: '/assets/company-logos/tesla.svg',
  swiggy: '/assets/company-logos/swiggy.svg',
  cyberminds: '/assets/company-logos/cyberminds.svg',
};

const JobCard = ({
  title,
  company,
  jobtype,
  min_salary,
  max_salary,
  location,
  description,
}) => {
  const getCompanyLogo = (companyName) => {
    if (!companyName) return '/assets/company-logos/amazon.svg';

    const normalizedCompany = companyName.toLowerCase().trim();

    // Check for exact matches first
    if (companyLogos[normalizedCompany]) {
      return companyLogos[normalizedCompany];
    }

    // Check for partial matches (e.g., "Amazon Web Services" should still use Amazon logo)
    for (const [key, value] of Object.entries(companyLogos)) {
      if (normalizedCompany.includes(key)) {
        return value;
      }
    }

    // Default to Amazon logo if no match found
    return '/assets/company-logos/amazon.svg';
  };
  const logoPath = getCompanyLogo(company);
  const isTesla = company?.toLowerCase().trim() === 'tesla';

  return (
    <div className="bg-white p-6 rounded-lg shadow-xs w-80 h-[25rem] relative mb-2">
      <div className="flex-grow flex flex-col space-y-4">
        {/* Posted Time */}
        <div className="absolute top-8 right-6">
          <span className="bg-[#b0d9ff] text-black px-3 py-2 rounded-lg text-sm">
            {'24h Ago'} {/* You may want to use application_deadline here */}
          </span>
        </div>
        {/* Company Logo and Title */}
        <div>
          <div className={`${!isTesla ? '-ms-2' : ''} w-24 h-24 relative`}>
            <Image src={logoPath} alt={`${company || 'Company'} logo`} fill />
          </div>
          <h2 className="text-xl mt-7 font-semibold text-gray-900">{title}</h2>
        </div>

        {/* Job Details */}
        <div className="flex gap-6 justify-between">
          <div className="flex items-center text-gray-600">
            <Image
              src="/assets/jobcard/exp.svg"
              alt="Experience"
              width={20}
              height={20}
            />
            <span className="text-sm ms-1">3+ yr Exp</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <Image
              src="/assets/jobcard/onsite.svg"
              alt="Location"
              width={20}
              height={20}
            />
            <span className="text-sm">{location || 'Remote'}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <Image
              src="/assets/jobcard/pay.svg"
              alt="Salary"
              width={20}
              height={20}
            />
            <span className="text-sm">
              {min_salary}
              {'LPA'}
            </span>
          </div>
        </div>

        {/* Job Description */}
        <div className="space-y-2 flex flex-wrap">
          <p className="text-gray-600 text-sm">• {description}</p>
        </div>

        {/* Apply Button */}
        <div className="bottom-5 absolute w-[17rem]">
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#00aaff !important',
              '&:hover': {
                backgroundColor: '#0095e6 !important',
              },
              textTransform: 'none',
              borderRadius: '10px', // You can tweak this value
            }}
            fullWidth
          >
            Apply Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
