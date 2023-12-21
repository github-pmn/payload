import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('spy_isp', { schema: 'spy_3200' })
export class SpyIsp {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'country', length: 256 })
  country: string;

  @Column('varchar', { name: 'isp', length: 256 })
  isp: string;

  @Column('varchar', { name: 'ip', length: 256 })
  ip: string;

  @Column('int', { name: 'asn', default: () => "'0'" })
  asn: number;

  @Column('int', { name: 'add_time', default: () => "'0'" })
  addTime: number;
}
