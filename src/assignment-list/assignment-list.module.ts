import { Module } from '@nestjs/common';
import { AssignmentListService } from './assignment-list.service';
import { AssignmentListController } from './assignment-list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssignmentListEntity } from './entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([AssignmentListEntity]), UserModule],
  providers: [AssignmentListService],
  controllers: [AssignmentListController],
  exports: [AssignmentListService]
})
export class AssignmentListModule {}
