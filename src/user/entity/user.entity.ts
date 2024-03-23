import { ApiProperty } from '@nestjs/swagger';
import { AssignmentListEntity } from 'src/assignment-list/entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class UserEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4();

  @ApiProperty({ example: 'userExample' })
  @Column({ name: 'name', nullable: false })
  name: string;

  @ApiProperty({ example: 'example@gmail.com' })
  @Column({ name: 'email', nullable: false, unique: true })
  email: string;

  @ApiProperty({ example: 'example123' })
  @Column({ name: 'password', nullable: false })
  password: string;

  @ApiProperty({ example: 'example123' })
  @Column({ name: 'confirm_password', nullable: false })
  confirmPassword: string;

  @ApiProperty({ example: 1 })
  @Column({ name: 'type_user', nullable: false })
  typeUser: number;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(
    () => AssignmentListEntity,
    (assignmentListEntity) => assignmentListEntity.user
  )
  assigmentList?: AssignmentListEntity[];
}
