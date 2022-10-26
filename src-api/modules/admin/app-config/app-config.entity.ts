import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseEntity } from '@src-api/core/base.entity';

@Entity({ name: 'app_config' })
export class AppConfig extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'config_id' })
  public configId: string;

  @Column({ name: 'config_key' })
  public configKey: string;

  @Column({ name: 'config_value' })
  public configValue: string;

  @Column({ name: 'config_name', nullable: true })
  public configName: string;
}
