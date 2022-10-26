import { Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, VersionColumn } from 'typeorm';

export abstract class BaseEntity {
  @CreateDateColumn({
    name: 'created_time',
  })
  public createdTime: string;

  @Column({
    name: 'created_by',
    nullable: true,
  })
  public createdBy: string;

  @UpdateDateColumn({
    name: 'updated_time',
    nullable: true,
  })
  public updatedTime: string;

  @Column({
    name: 'updated_by',
    nullable: true,
  })
  public updatedBy: string;

  @DeleteDateColumn({
    name: 'deleted_time',
    nullable: true,
  })
  public deletedTime: string;

  @Column({
    name: 'deleted_by',
    nullable: true,
  })
  public deletedBy: string;

  @VersionColumn({
    name: 'entity_version',
    nullable: true,
  })
  public entityVersion: number;
}
