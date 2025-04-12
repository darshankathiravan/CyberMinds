import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  company: string;

  @Column({ 
    enum: ["Full-time", "Part-time", "Contract", "Internship"],
    default: "Full-time"
  })
  jobtype: string;

  @Column()
  min_salary: number;

  @Column()
  max_salary: number;

  @Column()
  application_deadline: Date;

  @Column({ nullable: true })
  location?: string;

  @Column()
  description: string;
}