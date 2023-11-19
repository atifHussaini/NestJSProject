import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
} from 'typeorm';
import { Region } from '../region/region.entity';
import { Lead } from '../lead/lead.entity';

@Entity()
export class Property {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  address: string;

  @Column({ type: 'varchar' })
  data: Record<any, any>;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @ManyToOne(() => Region, (region) => region.properties)
  @JoinColumn({ name: 'regionId' })
  region: Region;

  @OneToOne(() => Lead, (lead) => lead.property)
  lead: Lead;
}
