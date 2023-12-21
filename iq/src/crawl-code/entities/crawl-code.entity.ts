import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('crawl_code', { schema: 'spy_3200' })
export class CrawlCode {
  @Column('mediumtext', { name: 'encode' })
  encode: string;

  @Column('mediumtext', { name: 'decode', nullable: true })
  decode: string | null;

  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('datetime', {
    name: 'create_time',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;

  @Column('datetime', {
    name: 'update_time',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateTime: Date;

  @Column('varchar', { name: 'url', length: 255 })
  url: string;

  @Column('tinyint', { name: 'useful', width: 1, default: () => "'0'" })
  useful: boolean;

  @Column('varchar', { name: 'note', nullable: true, length: 255 })
  note: string | null;
}
