import { Injectable, BadRequestException } from '@nestjs/common';
import { AppointmentRepository } from '../database/appointment.repository';
import { CreateAppointmentDto } from '../dto/create-appointment.dto';

@Injectable()
export class CreateAppointmentService {

    constructor(private readonly appointmentRepository: AppointmentRepository) { }

    async execute(data: CreateAppointmentDto) {
        try {
            const startTime = new Date(data.startTime)
            const endTime = new Date(data.endTime)
            const today = new Date()
            if (startTime < today) {
                throw new BadRequestException('Appointment start time must be in the future')
            }
            const hasConflict = await this.appointmentRepository.hasConflict(data.roomId, startTime, endTime)
            if (hasConflict) {
                throw new BadRequestException('Appointment conflict')
            }
            return await this.appointmentRepository.create(data)
        } catch (error) {
            throw error
        }
    }
}
