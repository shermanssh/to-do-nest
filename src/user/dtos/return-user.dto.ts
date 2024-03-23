import { ReturnAssignmentListDto } from 'src/assignment-list/dtos';
import { UserEntity } from '../entity';

export class ReturnUserDto {
  id: string;
  name: string;
  email: string;
  assignemntList?: ReturnAssignmentListDto[];

  constructor(userEntity: UserEntity) {
    this.id = userEntity.id;
    this.name = userEntity.name;
    this.email = userEntity.email;
    this.assignemntList = userEntity.assigmentList
      ? userEntity.assigmentList.map(
          (assignmentList) => new ReturnAssignmentListDto(assignmentList)
        )
      : undefined;
  }
}
