'use client';

import Image from 'next/image';
import LayersIcon from '@mui/icons-material/Layers';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { Button } from '@mui/material';
import { WhatsApp } from '@mui/icons-material';

const companyLogos = {
  amazon: '/assets/company-logos/amazon.png',
  google: '/assets/company-logos/google.png',
  microsoft: '/assets/company-logos/microsoft.png',
  apple: '/assets/company-logos/apple.png',
  facebook: '/assets/company-logos/facebook.png',
  whatsApp: '/assets/company-logos/whatsapp.png',
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
    if (!companyName) return '/assets/company-logos/default.png';

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
    return '/assets/company-logos/amazon.png';
  };
  const logoPath = getCompanyLogo(company);

  return (
    <div className="bg-white p-6 rounded-lg shadow-xs w-80 h-96 relative mb-2">
      {/* Posted Time */}
      <div className="absolute top-6 right-6">
        <span className="bg-[#b0d9ff] text-black px-3 py-1 rounded-md text-sm">
          {'24h Ago'} {/* You may want to use application_deadline here */}
        </span>
      </div>

      <div className="space-y-4">
        {/* Company Logo and Title */}
        <div className="items-start gap-4">
          <div className="w-16 h-16 relative rounded-lg shadow-xl">
            <Image
              src={logoPath}
              alt={`${company || 'Company'} logo`}
              fill
              className="p-1.5 object-contain"
              onError={(e) => {
                e.currentTarget.src = '/assets/company-logos/default.png';
              }}
            />
          </div>
          <h2 className="text-xl mt-7 font-semibold text-gray-900">{title}</h2>
        </div>
        {/* Job Details */}
        <div className="flex gap-6 justify-between">
          <div className="flex items-center text-gray-600">
            <PersonAddAltIcon className="w-5 h-5" />
            <span className="text-sm ms-1">3+ yr Exp</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <CorporateFareIcon className="w-5 h-5" />
            <span className="text-sm">{location || 'Remote'}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <LayersIcon className="w-5 h-5" />
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
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#00aaff !important',
            '&:hover': {
              backgroundColor: '#0095e6 !important',
            },
            textTransform: 'none',
          }}
          fullWidth
        >
          Apply Now
        </Button>
      </div>
    </div>
  );
};

export default JobCard;
