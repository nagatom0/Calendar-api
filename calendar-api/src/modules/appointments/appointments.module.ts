import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { AppointmentsController } from './appointments.controller';
import { CreateAppointmentService } from './use-cases/create-appointment.service';
import { UpdateAppointmentService } from './use-cases/update-appointment.service';
import { DeleteAppointmentService } from './use-cases/delete-appointment.service';
import { FindAppointmentByIdService } from './use-cases/find-appointment-by-id.service';
import { AppointmentRepository } from './database/appointment.repository';

@Module({
    imports: [
        PrismaModule,
        AuthModule,
    ],
    controllers: [AppointmentsController],
    providers: [PrismaService, CreateAppointmentService, UpdateAppointmentService, DeleteAppointmentService, FindAppointmentByIdService, AppointmentRepository],
})
export class AppointmentsModule { }
