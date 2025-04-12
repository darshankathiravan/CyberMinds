import React, { useState } from "react";
import axios from "axios";
import StyledTextField from "../common/StyledTextField";
import StyledDropdown from "../common/StyledDropdown";
import { Button, Typography, IconButton, TextField } from "@mui/material";
import { Close } from "@mui/icons-material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import dayjs from "dayjs";

const CreateJobForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    companyName: "",
    location: "",
    jobType: "",
    minSalary: "",
    maxSalary: "",
    applicationDeadline: null,
    jobDescription: "",
  });

  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const allowedCompanies = [
    "WhatsApp",
    "Amazon",
    "Apple",
    "Facebook"
  ];

  const handlePublish = async () => {
    try {
      // Transform the form data to match the required API format
      const postData = {
        title: formData.jobTitle,
        company: formData.companyName,
        jobtype: formData.jobType,
        min_salary: Number(formData.minSalary.replace(/\D/g, '') || 0),
        max_salary: Number(formData.maxSalary.replace(/\D/g, '') || 0),
        application_deadline: formData.applicationDeadline 
          ? new Date(formData.applicationDeadline).toISOString() 
          : null,
        location: formData.location || null,
        description: formData.jobDescription,
      };

      const response = await axios.post("http://localhost:3001/jobs/", postData);
      
      console.log("Job created successfully:", response.data);
      onClose();
    } catch (error) {
      console.error("Error creating job:", error);
    }
  };

  return (
    <div className="w-full bg-white p-7">
      <div className="flex justify-between items-center">
        <div className="flex-1 text-center mb-5">
          <Typography variant="h6" fontWeight="600">
            Create Job Opening
          </Typography>
        </div>
        <IconButton onClick={onClose} className="absolute right-2">
          <Close />
        </IconButton>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <StyledTextField
          title="Job Title"
          placeholder="Full Stack Developer"
          value={formData.jobTitle}
          onChange={(e) => handleChange("jobTitle", e.target.value)}
        />
        <StyledDropdown
          title="Company Name"
          placeholder="Select Company"
          options={allowedCompanies}
          value={formData.companyName}
          onChange={(e) => handleChange("companyName", e.target.value)}
        />
        <StyledDropdown
          title="Location"
          placeholder="Choose Preferred Location"
          options={["Chennai", "Bangalore", "Pune"]}
          value={formData.location}
          onChange={(e) => handleChange("location", e.target.value)}
        />
        <StyledDropdown
          title="Job Type"
          placeholder="FullTime"
          options={["FullTime", "PartTime", "Internship", "Contract"]}
          value={formData.jobType}
          onChange={(e) => handleChange("jobType", e.target.value)}
        />
        <div className="grid grid-cols-2 gap-4">
          <StyledTextField
            title="Min Salary"
            placeholder="₹0"
            startIcon="₹"
            value={formData.minSalary}
            onChange={(e) => handleChange("minSalary", e.target.value)}
          />
          <StyledTextField
            title="Max Salary"
            placeholder="₹12,00,000"
            startIcon="₹"
            value={formData.maxSalary}
            onChange={(e) => handleChange("maxSalary", e.target.value)}
          />
        </div>
        <div>
          <Typography
            variant="subtitle1"
            fontWeight="600"
            sx={{ marginBottom: "8px" }}
          >
            Application Deadline
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={
                formData.applicationDeadline
                  ? dayjs(formData.applicationDeadline)
                  : null
              }
              onChange={(date) => {
                const formattedDate = date ? date.format("YYYY-MM-DD") : "";
                handleChange("applicationDeadline", formattedDate);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  sx={{
                    height: "48px",
                    "& .MuiOutlinedInput-root": {
                      height: "48px",
                      borderRadius: "10px",
                    },
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "red",
                      },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "red",
                    },
                  }}
                />
              )}
            />
          </LocalizationProvider>
        </div>
      </div>

      <StyledTextField
        title="Job Description"
        placeholder="Please share a description to let the candidate know more about the job role"
        multiline
        value={formData.jobDescription}
        onChange={(e) => handleChange("jobDescription", e.target.value)}
        className="col-span-2"
      />

      <div className="flex justify-between mt-8">
        <Button
          variant="outlined"
          color="inherit"
          startIcon={<KeyboardDoubleArrowDownIcon />}
          sx={{
            textTransform: "none",
            fontWeight: 600,
            fontSize: 16,
            borderRadius: "10px",
            px: 3,
          }}
        >
          Save Draft
        </Button>
        <Button
          variant="contained"
          color="primary"
          endIcon={<KeyboardDoubleArrowRightIcon />}
          onClick={handlePublish}
          sx={{
            textTransform: "none",
            fontWeight: 600,
            fontSize: 16,
            borderRadius: "10px",
            px: 4,
          }}
        >
          Publish
        </Button>
      </div>
    </div>
  );
};

export default CreateJobForm;