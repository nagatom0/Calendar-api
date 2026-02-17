import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { CreateAppointmentService } from "./use-cases/create-appointment.service";
import { UpdateAppointmentService } from "./use-cases/update-appointment.service";
import { DeleteAppointmentService } from "./use-cases/delete-appointment.service";
import { FindAppointmentByIdService } from "./use-cases/find-appointment-by-id.service";
import { AuthenticationRequired } from "../auth/guards/authentication-required.guard";
import { ContextUser } from "../auth/decorators/context-user.decorator";
import { CreateAppointmentDto } from "./dto/create-appointment.dto";
import { UpdateAppointmentDto } from "./dto/update-appointment.dto";

@Controller('appointments')
export class AppointmentsController {
    constructor(
        private readonly createAppointmentService: CreateAppointmentService,
        private readonly updateAppointmentService: UpdateAppointmentService,
        private readonly deleteAppointmentService: DeleteAppointmentService,
        private readonly findAppointmentByIdService: FindAppointmentByIdService,
    ) { }

    @Post()
    @UseGuards(AuthenticationRequired)
    async createAppointment(
        @ContextUser() loggedUser: any,
        @Body() data: CreateAppointmentDto,
    ) {
        return this.createAppointmentService.execute(data);
    }

    @Put('/:appointmentId')
    @UseGuards(AuthenticationRequired)
    async updateAppointment(
        @ContextUser() loggedUser: any,
        @Param('appointmentId') appointmentId: string,
        @Body() data: UpdateAppointmentDto,
    ) {
        return this.updateAppointmentService.execute(
            appointmentId,
            data,
        )
    }

    @Delete('/:appointmentId')
    @UseGuards(AuthenticationRequired)
    async deleteAppointment(
        @ContextUser() loggedUser: any,
        @Param('appointmentId') appointmentId: string,
    ) {
        return this.deleteAppointmentService.execute(appointmentId);
    }

    @Get('/:appointmentId')
    @UseGuards(AuthenticationRequired)
    async findAppointmentById(
        @ContextUser() loggedUser: any,
        @Param('appointmentId') appointmentId: string,
    ) {
        return this.findAppointmentByIdService.execute(appointmentId);
    }
}