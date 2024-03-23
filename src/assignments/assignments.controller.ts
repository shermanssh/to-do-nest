import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { AssignmentEntity } from './entity';
import {
  CreateAssignmentDto,
  ReturnAssignmentDto,
  UpdatedAssignmentDto
} from './dtos';
import { AssignmentsService } from './assignments.service';
import { DeleteResult } from 'typeorm';
import { Roles } from 'src/core/decorators/roles.decorator';
import { UserType } from 'src/user/enum';
import { UserId } from 'src/core/decorators/user-id.decorator';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import {
  ReturnCreateAssignmentSwagger,
  ReturnAssignmentsSwagger,
  ReturnUnconcludeAssignmentSwagger
} from './swagger';
import { ReturnOneAssignmentSwagger } from './swagger/return-one-assignment';
import { ReturnDeletedItemSwagger } from 'src/swagger';
import {
  ReturnNotFoundAssignments,
  ReturnOneNotFoundAssignment
} from './swagger/errors';

@ApiTags('Assignments')
@ApiBearerAuth('KEY_AUTH')
@Roles(UserType.User)
@UsePipes(ValidationPipe)
@Controller('assignments')
export class AssignmentsController {
  constructor(private assignmentService: AssignmentsService) {}

  @Post()
  @ApiOperation({ summary: 'Add a new assignment ' })
  @ApiResponse({
    status: 201,
    description: 'Tarefa adicionada com sucesso',
    type: ReturnCreateAssignmentSwagger
  })
  async createAssignment(
    @Body()
    createAssignment: CreateAssignmentDto
  ): Promise<AssignmentEntity> {
    return await this.assignmentService.createAssignment(createAssignment);
  }

  @Get()
  @ApiOperation({ summary: 'Search assignments ' })
  @ApiResponse({
    status: 200,
    description: 'Tarefas retornadas com sucesso',
    type: ReturnAssignmentsSwagger
  })
  @ApiResponse({
    status: 404,
    description: 'Tarefas não encontradas',
    type: ReturnNotFoundAssignments
  })
  @ApiQuery({ name: 'Page', required: false })
  @ApiQuery({ name: 'PerPage', required: false })
  async findAssignments(
    @UserId() userId: string,
    @Query('Page') page: number = 1,
    @Query('PerPage') limit: number = 10
  ): Promise<{ items: ReturnAssignmentDto[] }> {
    const assignments = await this.assignmentService.findAssignmentsByUserId(
      userId,
      page,
      limit
    );
    const mappedAssignments = assignments.map(
      (assignment) => new ReturnAssignmentDto(assignment)
    );
    return { items: mappedAssignments };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a assignment ' })
  @ApiResponse({
    status: 200,
    description: 'Tarefa retornada com sucesso',
    type: ReturnOneAssignmentSwagger
  })
  @ApiResponse({
    status: 404,
    description: 'Tarefa não encontrada',
    type: ReturnOneNotFoundAssignment
  })
  async findAssignmentsById(
    @Param('id', new ParseUUIDPipe()) assignmentId: string
  ): Promise<ReturnAssignmentDto> {
    return new ReturnAssignmentDto(
      await this.assignmentService.findAssignmentById(assignmentId)
    );
  }

  @Patch(':id/conclude')
  @ApiOperation({ summary: 'Conclude a task ' })
  @ApiResponse({
    status: 200,
    description: 'Tarefa concluída com sucesso',
    type: AssignmentEntity
  })
  @ApiResponse({
    status: 404,
    description: 'Tarefa não encontrada',
    type: ReturnOneNotFoundAssignment
  })
  async updatedAssignmentConclude(
    @UserId() userId: string,
    @Param('id', new ParseUUIDPipe()) assignmentId: string
  ): Promise<ReturnAssignmentDto> {
    return new ReturnAssignmentDto(
      await this.assignmentService.updatedConcludeAssignment(
        userId,
        assignmentId
      )
    );
  }

  @Patch(':id/unconclude')
  @ApiOperation({ summary: 'Desconclude a task ' })
  @ApiResponse({
    status: 200,
    description: 'Tarefa marcada como não concluída com sucesso',
    type: ReturnUnconcludeAssignmentSwagger
  })
  @ApiResponse({
    status: 404,
    description: 'Tarefa não encontrada',
    type: ReturnOneNotFoundAssignment
  })
  async updatedAssignmentUnconclude(
    @UserId() userId: string,
    @Param('id', new ParseUUIDPipe()) assignmentId: string
  ): Promise<ReturnAssignmentDto> {
    return new ReturnAssignmentDto(
      await this.assignmentService.updatedUnconcludeAssignment(
        userId,
        assignmentId
      )
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a assignment ' })
  @ApiResponse({
    status: 200,
    description: 'Tarefa deletada com sucesso',
    type: ReturnDeletedItemSwagger
  })
  @ApiResponse({
    status: 404,
    description: 'Tarefa não encontrada',
    type: ReturnOneNotFoundAssignment
  })
  async deleteAssignment(
    @UserId() UserId: string,
    @Param('id', new ParseUUIDPipe()) assignmentId: string
  ): Promise<DeleteResult> {
    return this.assignmentService.deleteAssignment(UserId, assignmentId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Edit a assignment ' })
  @ApiResponse({
    status: 200,
    description: 'Tarefa editada com sucesso',
    type: ReturnAssignmentDto
  })
  @ApiResponse({
    status: 404,
    description: 'Tarefa não encontrada',
    type: ReturnOneNotFoundAssignment
  })
  async updateAssigment(
    @UserId() UserId: string,
    @Param('id', new ParseUUIDPipe()) assignmentId: string,
    @Body() assignmentUpdated: UpdatedAssignmentDto
  ): Promise<ReturnAssignmentDto> {
    return new ReturnAssignmentDto(
      await this.assignmentService.updateAssignment(
        UserId,
        assignmentId,
        assignmentUpdated
      )
    );
  }
}
