import {
  Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
} from 'typeorm';
import { Property } from '../property/property.entity';

@Entity()
export class Lead {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  contactInfo: string;

  @OneToOne(() => Property, (property) => property.lead)
  @JoinColumn({ name: 'propertyId' })
  property: Property;

  @Column()
  leadScore: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
