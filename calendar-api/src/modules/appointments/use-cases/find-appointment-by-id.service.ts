import { Injectable } from "@nestjs/common";
import { AppointmentRepository } from "../database/appointment.repository";

@Injectable()
export class FindAppointmentByIdService {

    constructor(private readonly appointmentRepository: AppointmentRepository) { }

    async execute(appointmentId: string) {
        const appointment = await this.appointmentRepository.findById(appointmentId)

        if (!appointment) {
            throw new Error('Appointment not found')
        }

        return appointment
    }
}