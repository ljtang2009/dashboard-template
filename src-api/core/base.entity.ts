import {
  CreateDateColumn, UpdateDateColumn, DeleteDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @CreateDateColumn({
    name: 'created_time',
  })
  public createdTime: string;

  @UpdateDateColumn({
    name: 'updated_time',
    nullable: true,
  })
  public updatedTime: string;

  @DeleteDateColumn({
    name: 'deleted_time',
    nullable: true,
  })
  public deletedTime: string;
}
