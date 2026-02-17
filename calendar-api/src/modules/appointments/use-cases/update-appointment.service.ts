import { Injectable } from '@nestjs/common';
import { AppointmentRepository } from '../database/appointment.repository';
import { UpdateAppointmentDto } from '../dto/update-appointment.dto';

@Injectable()
export class UpdateAppointmentService {

    constructor(private readonly appointmentRepository: AppointmentRepository) { }

    async execute(appointmentId: string, data: UpdateAppointmentDto) {
        try {
            const appointment = await this.appointmentRepository.findById(appointmentId)

            if (!appointment) {
                throw new Error('Appointment not found')
            }

            return this.appointmentRepository.update(appointmentId, data)
        } catch (error) {
            throw error
        }
    }
}
