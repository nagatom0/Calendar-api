import { Injectable } from "@nestjs/common";
import { AppointmentRepository } from "../database/appointment.repository";

@Injectable()
export class DeleteAppointmentService {

    constructor(private readonly appointmentRepository: AppointmentRepository) { }

    async execute(appointmentId: string) {
        try {
            const appointment = await this.appointmentRepository.findById(appointmentId)

            if (!appointment) {
                throw new Error('Appointment not found')
            }

            return this.appointmentRepository.delete(appointmentId)

        } catch (error) {
            throw error
        }
    }
}