'use client';

import { Button, Dialog } from '@mui/material';
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
        <div className="flex items-center justify-center space-x-8 py-4 px-6 mx-auto w-fit rounded-4xl shadow-sm font-normal text-[600] text-[16px]">
          <Image
            className="h-10 w-auto"
            width={30}
            height={30}
            src="/assets/company-logos/cyberminds.svg"
            alt="cyberminds"
          />
          <a
            href="#"
            className="rounded-md px-3 py-2 hover:bg-[#fae8e8]"
            aria-current="page"
          >
            Home
          </a>
          <a
            href="#"
            className="rounded-md px-3 py-2 hover:bg-[#fae8e8] "
          >
            Find Jobs
          </a>
          <a
            href="#"
            className="rounded-md px-3 py-2 hover:bg-[#fae8e8] "
          >
            Find Talents
          </a>
          <a
            href="#"
            className="rounded-md px-3 py-2 hover:bg-[#fae8e8]"
          >
            About us
          </a>
          <a
            href="#"
            className="rounded-md px-3 py-2 hover:bg-[#fae8e8]"
          >
            Testimonials
          </a>
          <Button
            sx={{
              borderRadius: '30px',
              padding: '8px 24px',
              textTransform: 'none',
              color: 'white',
              background: 'linear-gradient(180deg, #A128FF 0%, #6100AD 100%)',
            }}
            onClick={handleToggle}
          >
            Create Jobs
          </Button>
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
