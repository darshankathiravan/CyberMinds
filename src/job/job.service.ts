import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from './job.entity';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private jobRepo: Repository<Job>,
  ) {}

  async create(job: Partial<Job>) {
    const newJob = this.jobRepo.create(job);
    return await this.jobRepo.save(newJob);
  }

  async findAll() {
    return await this.jobRepo.find();
  }

  async findOne(id: number) {
    const job = await this.jobRepo.findOneBy({ id });
    if (!job) {
      throw new NotFoundException('Job not found');
    }
    return job;
  }

  async update(id: number, job: Partial<Job>) {
    const existing = await this.jobRepo.findOneBy({ id });
    if (!existing) {
      throw new NotFoundException('Job not found');
    }
    
    const updated = await this.jobRepo.save({
      ...existing,
      ...job,
      id, // Ensure ID remains the same
    });
    
    return updated;
  }

  async remove(id: number) {
    const result = await this.jobRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Job not found');
    }
    return { success: true };
  }
}