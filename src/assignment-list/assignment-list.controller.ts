import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { AssignmentListService } from './assignment-list.service';
import { AssignmentListEntity } from './entity';
import { CreateAssignmentListDto, UpdateAssignmentListDto } from './dtos';
import { ReturnAssignmentListDto } from './dtos/return-assignment-list.dto';
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
  ReturnAssignmentCreatedSwagger,
  ReturnAssignmentListSwagger,
  ReturnOneAssignmentListSwagger
} from './swagger';
import { ReturnDeletedItemSwagger } from 'src/swagger';
import {
  ReturnNotFoundAssignmentList,
  ReturnOneNotFoundAssignmentList,
  ReturnUnprocessableAssignmentList
} from './swagger/errors';

@Roles(UserType.User)
@ApiBearerAuth('KEY_AUTH')
@ApiTags('Assignment-List')
@UsePipes(ValidationPipe)
@Controller('assignment-list')
export class AssignmentListController {
  constructor(private assigmentListService: AssignmentListService) {}

  @Post()
  @ApiOperation({ summary: 'Add a new to-do list' })
  @ApiResponse({
    status: 201,
    description: 'Lista criada com sucesso',
    type: ReturnAssignmentCreatedSwagger
  })
  async createAssigmentListDto(
    @UserId() id: string,
    @Body() createAssigmentList: CreateAssignmentListDto
  ): Promise<AssignmentListEntity> {
    return await this.assigmentListService.createAssigmentList(
      createAssigmentList,
      id
    );
  }

  @Get()
  @ApiOperation({ summary: 'Search to-do list ' })
  @ApiResponse({
    status: 200,
    description: 'AssignmentLists retornadas com sucesso',
    type: ReturnAssignmentListSwagger
  })
  @ApiResponse({
    status: 404,
    description: 'AssignmentLists não encontradas',
    type: ReturnNotFoundAssignmentList
  })
  @ApiQuery({ name: 'Page', required: false })
  @ApiQuery({ name: 'PerPage', required: false })
  async findAssignmentList(
    @UserId() userId: string,
    @Query('Page') page: number = 1,
    @Query('PerPage') limit: number = 10
  ): Promise<{ items: ReturnAssignmentListDto[] }> {
    const assignmentLists =
      await this.assigmentListService.findAllAssignmentListByUserId(
        userId,
        page,
        limit
      );
    const mappedAssignmentLists = assignmentLists.map(
      (assignmentList) => new ReturnAssignmentListDto(assignmentList)
    );
    return { items: mappedAssignmentLists };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a to-do list ' })
  @ApiResponse({
    status: 200,
    description: 'AssignmentList retornadas com sucesso',
    type: ReturnOneAssignmentListSwagger
  })
  @ApiResponse({
    status: 404,
    description: 'AssignmentList não encontrada',
    type: ReturnOneNotFoundAssignmentList
  })
  async findAssignmentListById(
    @Param('id', new ParseUUIDPipe()) assignmentListId: string
  ): Promise<ReturnAssignmentListDto> {
    return new ReturnAssignmentListDto(
      await this.assigmentListService.findAssignmentListById(assignmentListId)
    );
  }

  @Put(':id')
  @ApiOperation({ summary: 'Edit a to-do list' })
  @ApiResponse({
    status: 200,
    description: 'AssignmentList editada com sucesso',
    type: AssignmentListEntity
  })
  @ApiResponse({
    status: 404,
    description: 'AssignmentList não encontrada',
    type: ReturnOneNotFoundAssignmentList
  })
  async updateAssignmentList(
    @UserId() userId: string,
    @Param('id', new ParseUUIDPipe()) assignmentListId: string,
    @Body() updatedAssignmentList: UpdateAssignmentListDto
  ): Promise<AssignmentListEntity> {
    return await this.assigmentListService.updateAssigmentList(
      userId,
      assignmentListId,
      updatedAssignmentList
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a to-do list ' })
  @ApiResponse({
    status: 200,
    description: 'AssignmentList deletada com sucesso',
    type: ReturnDeletedItemSwagger
  })
  @ApiResponse({
    status: 404,
    description: 'AssignmentList não encontrada',
    type: ReturnOneNotFoundAssignmentList
  })
  @ApiResponse({
    status: 422,
    description: 'AssignmentList não com tarefas não concluídas',
    type: ReturnUnprocessableAssignmentList
  })
  async deleteAssignmentList(
    @UserId() userId: string,
    @Param('id', new ParseUUIDPipe()) assignmentListId: string
  ): Promise<DeleteResult> {
    return this.assigmentListService.deleteAssignmentList(
      userId,
      assignmentListId
    );
  }
}
