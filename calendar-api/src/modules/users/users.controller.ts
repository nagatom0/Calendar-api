import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { UpdateUserService } from './use-cases/update-user.service';
import { DeleteUserService } from './use-cases/delete-user.service';
import { FindUserByIdService } from './use-cases/find-user-by-id.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthenticationRequired } from '../auth/guards/authentication-required.guard';
import { ContextUser } from '../auth/decorators/context-user.decorator';

@Controller('users')
export class UsersController {
    constructor(
        private readonly updateUserService: UpdateUserService,
        private readonly deleteUserService: DeleteUserService,
        private readonly findUserByIdService: FindUserByIdService,
    ) { }

    @Get('/:userId')
    @UseGuards(AuthenticationRequired)
    async findOne(
        @ContextUser() loggedUser: any,
        @Param('userId') userId: string,
    ) {
        return this.findUserByIdService.execute(userId);
    }

    @Put('/:userId')
    @UseGuards(AuthenticationRequired)
    async updateUser(
        @ContextUser() loggedUser: any,
        @Param('userId') userId: string,
        @Body() data: UpdateUserDto,
    ) {
        return this.updateUserService.execute(
            userId,
            data,
        )
    }

    @Delete('/:userId')
    @UseGuards(AuthenticationRequired)
    async deleteUser(
        @ContextUser() loggedUser: any,
        @Param('userId') userId: string,
    ) {
        return this.deleteUserService.execute(userId);
    }
}
