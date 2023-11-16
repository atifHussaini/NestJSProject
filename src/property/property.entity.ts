import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import { Region } from '../region/region.entity';

@Entity()
export class Property {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column()
  data: JSON;

  @ManyToOne(() => Region, (region) => region.properties)
  @JoinColumn({ name: 'regionId' })
  region: Region;
}
