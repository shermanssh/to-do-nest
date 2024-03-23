import { ApiProperty } from '@nestjs/swagger';
import { AssignmentListEntity } from 'src/assignment-list/entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class AssignmentEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string = uuidv4();

  @Column({ name: 'description', nullable: false })
  @ApiProperty()
  description: string;

  @Column({ name: 'dead_line', nullable: false })
  @ApiProperty()
  deadLine: Date;

  @Column({ name: 'assignment_list_id', nullable: false })
  @ApiProperty()
  assignmentListId: string;

  @Column({ name: 'assignment_list_name', nullable: false })
  @ApiProperty()
  assignmentListName: string;

  @Column({ name: 'concluded', nullable: true, default: false })
  @ApiProperty()
  concluded: boolean;

  @Column({
    name: 'conclude_at',
    nullable: true,
    default: null
  })
  concludeAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty()
  createAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiProperty()
  updateAt: Date;

  @ManyToOne(
    () => AssignmentListEntity,
    (assignmentListEntity) => assignmentListEntity.assignments,
    { onDelete: 'CASCADE' }
  )
  @JoinColumn({ name: 'assignment_list_id', referencedColumnName: 'id' })
  assignmentList?: AssignmentListEntity;
}
