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

  // job.service.ts
  async searchAndFilter(query: {
    title?: string;
    min_salary?: number;
    max_salary?: number;
    jobtype?: string;
    location?: string;
  }) {
    const qb = this.jobRepo.createQueryBuilder('job');

    if (query.title) {
      qb.andWhere('job.title ILIKE :title', { title: `%${query.title}%` });
    }

    if (query.jobtype) {
      qb.andWhere('job.jobtype ILIKE :jobtype', { jobtype: `%${query.jobtype}%` });
    }

    if (query.location) {
      qb.andWhere('job.location ILIKE :location', {
        location: `%${query.location}%`,
      });
    }

    if (query.min_salary !== undefined) {
      qb.andWhere('job.min_salary >= :min_salary', {
        min_salary: query.min_salary,
      });
    }

    if (query.max_salary !== undefined) {
      qb.andWhere('job.max_salary <= :max_salary', {
        max_salary: query.max_salary,
      });
    }

    const jobs = await qb.getMany();
    return jobs;
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
