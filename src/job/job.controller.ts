import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { JobService } from './job.service';
import { Job } from './job.entity';
import { Query } from '@nestjs/common';

@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() jobData: Partial<Job>) {
    const job = await this.jobService.create(jobData);
    return {
      success: true,
      data: job,
    };
  }

  @Get()
  async findAll() {
    const jobs = await this.jobService.findAll();
    return {
      success: true,
      data: jobs,
    };
  }

  // Move this route BEFORE the :id route
  @Get('search')
  async searchAndFilter(
    @Query('title') title?: string,
    @Query('min_salary') min_salary?: string,
    @Query('max_salary') max_salary?: string,
    @Query('jobtype') jobtype?: string,
    @Query('location') location?: string,
  ) {
    const parsedMinSalary =
      min_salary && !isNaN(+min_salary) ? Number(min_salary) : undefined;
    const parsedMaxSalary =
      max_salary && !isNaN(+max_salary) ? Number(max_salary) : undefined;

    const jobs = await this.jobService.searchAndFilter({
      title,
      jobtype,
      location,
      min_salary: parsedMinSalary,
      max_salary: parsedMaxSalary,
    });

    return {
      success: true,
      data: jobs,
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const job = await this.jobService.findOne(id);
    if (!job) {
      return {
        success: false,
        message: 'Job not found',
      };
    }
    return {
      success: true,
      data: job,
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() jobData: Partial<Job>,
  ) {
    const updatedJob = await this.jobService.update(id, jobData);
    if (!updatedJob) {
      return {
        success: false,
        message: 'Job not found',
      };
    }
    return {
      success: true,
      data: updatedJob,
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const result = await this.jobService.remove(id);
    if (!result) {
      return {
        success: false,
        message: 'Job not found',
      };
    }
    return {
      success: true,
      message: 'Job deleted successfully',
    };
  }
}