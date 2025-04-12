'use client';

import { Dialog } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import CreateJobForm from './CreateJobForm';

const Topbar = () => {
  const [open, setOpen] = useState(false);
  const handleToggle = () => setOpen((prev) => !prev);

  return (
    <>
      <nav className="p-2">
        <div className="flex items-center justify-center space-x-8 p-4 mx-auto w-fit rounded-4xl shadow-lg text-black">
          <img
            className="h-8 w-auto"
            src="/assets/company-logos/cyberminds.jpeg"
            alt="Your Company"
          />
          <a
            href="#"
            className="rounded-md px-3 py-2 text-sm font-medium hover:bg-[#fae8e8]"
            aria-current="page"
          >
            Home
          </a>
          <a
            href="#"
            className="rounded-md px-3 py-2 text-sm font-medium hover:bg-[#fae8e8] "
          >
            Find Jobs
          </a>
          <a
            href="#"
            className="rounded-md px-3 py-2 text-sm font-medium hover:bg-[#fae8e8] "
          >
            Find Talents
          </a>
          <a
            href="#"
            className="rounded-md px-3 py-2 text-sm font-medium hover:bg-[#fae8e8]"
          >
            Testimonials
          </a>
          <button
            className="rounded-3xl bg-[#7e13d3] px-3 py-1 text-white"
            onClick={handleToggle}
          >
            Create Jobs
          </button>
        </div>
      </nav>

      <Dialog
        open={open}
        onClose={handleToggle}
        fullWidth
        sx={{
          '& .MuiPaper-root': {
            borderRadius: '20px',
            maxHeight: 'none', 
          },
        }}
      >
        <CreateJobForm onClose={handleToggle} />
      </Dialog>
    </>
  );
};

export default Topbar;
