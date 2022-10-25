import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'sys_config' })
export class SysConfig {
  @PrimaryGeneratedColumn('uuid', { name: 'config_id' })
  public configId!: string;

  @Column({ name: 'config_key' })
  public configKey!: string;
}
