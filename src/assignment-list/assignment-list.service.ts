import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssignmentListEntity } from './entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateAssignmentListDto, UpdateAssignmentListDto } from './dtos';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AssignmentListService {
  constructor(
    @InjectRepository(AssignmentListEntity)
    private readonly assignmentListRepository: Repository<AssignmentListEntity>,
    private readonly userService: UserService
  ) {}
  async createAssigmentList(
    createAssigmentListDto: CreateAssignmentListDto,
    userId: string
  ): Promise<AssignmentListEntity> {
    await this.userService.findUserById(userId);

    return this.assignmentListRepository.save({
      ...createAssigmentListDto,
      userId
    });
  }

  async findAllAssignmentList(): Promise<AssignmentListEntity[]> {
    const assigmentList = await this.assignmentListRepository.find();

    if (!assigmentList || assigmentList.length === 0) {
      throw new NotFoundException(`assigmentList not found`);
    }

    return assigmentList;
  }

  async findAllAssignmentListByUserId(
    userId: string,
    page: number = 1,
    limit: number = 10
  ): Promise<AssignmentListEntity[]> {
    await this.userService.findUserById(userId);
    const skip = (page - 1) * limit;

    const assignmentLists = await this.assignmentListRepository.find({
      where: { userId: userId },
      relations: ['assignments'],
      skip,
      take: limit
    });

    if (!assignmentLists || assignmentLists.length === 0) {
      return [];
    }

    return assignmentLists;
  }

  async findAssignmentListById(listId: string): Promise<AssignmentListEntity> {
    const assignmentList = await this.assignmentListRepository.findOne({
      where: {
        id: listId
      },
      relations: ['assignments']
    });

    if (!assignmentList) {
      throw new NotFoundException(`list not found for id ${listId}`);
    }

    return assignmentList;
  }

  async updateAssigmentList(
    userId: string,
    assignmentlistId: string,
    updatedAssignmentList: UpdateAssignmentListDto
  ): Promise<AssignmentListEntity> {
    const assigmentList = await this.findAssignmentListById(assignmentlistId);

    if (assigmentList.userId !== userId) {
      throw new UnauthorizedException(
        `You do not have permission to update this list`
      );
    }

    return this.assignmentListRepository.save({
      ...assigmentList,
      ...updatedAssignmentList
    });
  }

  async deleteAssignmentList(
    userId: string,
    assignmentListId: string
  ): Promise<DeleteResult> {
    const assignmentList = await this.findAssignmentListById(assignmentListId);

    if (!assignmentList) {
      throw new NotFoundException(`List not found with Id ${assignmentListId}`);
    }

    const hasUncompletedAssignments = assignmentList.assignments.some(
      (assignment) => assignment.concluded === false
    );

    if (hasUncompletedAssignments) {
      throw new UnprocessableEntityException(
        'Existem tarefas não concluídas na lista'
      );
    }

    if (assignmentList.userId !== userId) {
      throw new UnauthorizedException(
        `You do not have permission to delete this list`
      );
    }

    return this.assignmentListRepository.delete({
      id: assignmentListId
    });
  }
}
