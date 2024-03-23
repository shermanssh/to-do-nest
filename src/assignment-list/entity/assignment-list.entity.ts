import { ApiProperty } from '@nestjs/swagger';
import { AssignmentEntity } from 'src/assignments/entity';
import { UserEntity } from 'src/user/entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class AssignmentListEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string = uuidv4();

  @Column({ name: 'name', nullable: false })
  @ApiProperty()
  name: string;

  @Column({ name: 'user_id', nullable: false })
  @ApiProperty()
  userId: string;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiProperty()
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.assigmentList)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user?: UserEntity;

  @OneToMany(
    () => AssignmentEntity,
    (assignmentEntity) => assignmentEntity.assignmentList,
    { onDelete: 'CASCADE' }
  )
  assignments?: AssignmentEntity[];
}
