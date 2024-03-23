import {
  Injectable,
  NotFoundException,
  ParseUUIDPipe,
  UnauthorizedException,
  UnprocessableEntityException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssignmentEntity } from './entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateAssignmentDto, UpdatedAssignmentDto } from './dtos';
import { AssignmentListService } from 'src/assignment-list/assignment-list.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectRepository(AssignmentEntity)
    private readonly assignmentsRepository: Repository<AssignmentEntity>,
    private readonly userService: UserService,
    private readonly assignmentListService: AssignmentListService
  ) {}
  async createAssignment(
    createAssignment: CreateAssignmentDto
  ): Promise<AssignmentEntity> {
    const assignmentList =
      await this.assignmentListService.findAssignmentListById(
        createAssignment.assignmentListId
      );

    const parseUUIDPipe = new ParseUUIDPipe({ version: '4' });

    const assignmentListId = await parseUUIDPipe.transform(
      createAssignment.assignmentListId,
      {
        type: 'body',
        metatype: String,
        data: ''
      }
    );

    const date = createAssignment.deadLine;
    const formattedDate = new Date(date);

    if (formattedDate < new Date()) {
      throw new UnprocessableEntityException(
        'A data de conclusão deve ser maior que a data atual'
      );
    }

    return await this.assignmentsRepository.save({
      ...createAssignment,
      assignmentListId,
      deadLine: formattedDate,
      assignmentListName: assignmentList.name
    });
  }

  async findAssignments(
    page: number = 1,
    limit: number = 10
  ): Promise<AssignmentEntity[]> {
    const skip = (page - 1) * limit;
    const assignments = await this.assignmentsRepository.find({
      skip,
      take: limit
    });

    if (!assignments || assignments.length === 0) {
      throw new NotFoundException(`Assignments not found`);
    }

    return assignments;
  }

  async findAssignmentsByUserId(
    userId: string,
    page: number = 1,
    limit: number = 10
  ): Promise<AssignmentEntity[]> {
    const user = await this.userService.findUserById(userId);

    if (!user.assigmentList || user.assigmentList.length === 0) {
      return [];
    }

    let assignments: AssignmentEntity[] = [];
    user.assigmentList.forEach((assignmentList) => {
      if (assignmentList.assignments) {
        assignments = assignments.concat(assignmentList.assignments);
      } else {
        return [];
      }
    });

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedAssignments = assignments.slice(startIndex, endIndex);

    return paginatedAssignments;
  }

  async findAssignmentById(assignmentId: string): Promise<AssignmentEntity> {
    const assignment = await this.assignmentsRepository.findOne({
      where: {
        id: assignmentId
      }
    });

    if (!assignment) {
      throw new NotFoundException(
        `Assignment not found with Id ${assignmentId}`
      );
    }

    return assignment;
  }

  async updatedConcludeAssignment(
    userId: string,
    assignmentId: string
  ): Promise<AssignmentEntity> {
    const assignment = await this.findAssignmentById(assignmentId);

    const assignmentList =
      await this.assignmentListService.findAssignmentListById(
        assignment.assignmentListId
      );
    if (assignmentList.userId !== userId) {
      throw new UnauthorizedException(
        `You do not have permission to conclude this assignment`
      );
    }

    if (!assignment.concluded) {
      assignment.concluded = true;
      assignment.concludeAt = new Date();
    }

    return this.assignmentsRepository.save(assignment);
  }

  async updatedUnconcludeAssignment(
    userId: string,
    assignmentId: string
  ): Promise<AssignmentEntity> {
    const assignment = await this.findAssignmentById(assignmentId);

    const assignmentList =
      await this.assignmentListService.findAssignmentListById(
        assignment.assignmentListId
      );
    if (assignmentList.userId !== userId) {
      throw new UnauthorizedException(
        `You do not have permission to unconclude this assignment`
      );
    }

    if (assignment.concluded) {
      assignment.concluded = false;
      assignment.concludeAt = null;
    }

    return this.assignmentsRepository.save(assignment);
  }

  async deleteAssignment(
    userId: string,
    assignmentId: string
  ): Promise<DeleteResult> {
    const assignment = await this.findAssignmentById(assignmentId);

    const assignmentList =
      await this.assignmentListService.findAssignmentListById(
        assignment.assignmentListId
      );
    if (assignmentList.userId !== userId) {
      throw new UnauthorizedException(
        `You do not have permission to delete this assignment`
      );
    }

    return this.assignmentsRepository.delete({ id: assignmentId });
  }

  async updateAssignment(
    userId: string,
    assignmentId: string,
    assignmentUpdated: UpdatedAssignmentDto
  ): Promise<AssignmentEntity> {
    const assignment = await this.findAssignmentById(assignmentId);

    const assignmentList =
      await this.assignmentListService.findAssignmentListById(
        assignment.assignmentListId
      );
    if (assignmentList.userId !== userId) {
      throw new UnauthorizedException(
        `You do not have permission to update this assignment`
      );
    }

    return this.assignmentsRepository.save({
      ...assignment,
      ...assignmentUpdated
    });
  }
}
