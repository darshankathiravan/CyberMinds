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