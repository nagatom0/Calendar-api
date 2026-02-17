import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserRepository } from './database/user.repository';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateUserService } from './use-cases/update-user.service';
import { DeleteUserService } from './use-cases/delete-user.service';
import { FindUserByIdService } from './use-cases/find-user-by-id.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
  ],
  controllers: [UsersController],
  providers: [UpdateUserService, DeleteUserService, FindUserByIdService, UserRepository, PrismaService],
})
export class UsersModule { }
