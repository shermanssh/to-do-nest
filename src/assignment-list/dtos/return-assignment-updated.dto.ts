import { AssignmentListEntity } from '../entity';

export class ReturnAssignmentListUpdatedDto {
  id: string;
  name: string;

  constructor(assignmentListEntity: AssignmentListEntity) {
    this.id = assignmentListEntity.id;
    this.name = assignmentListEntity.name;
  }
}
