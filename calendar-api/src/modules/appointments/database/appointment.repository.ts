import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../../prisma/prisma.service'
import { CreateAppointmentDto } from '../dto/create-appointment.dto'
import { UpdateAppointmentDto } from '../dto/update-appointment.dto'

@Injectable()
export class AppointmentRepository {
    constructor(private prisma: PrismaService) { }

    async findById(appointmentId: string) {
        try {
            return this.prisma.appointment.findUnique({
                where: { id: appointmentId },
            })
        } catch (error) {
            throw error
        }
    }

    async create(data: CreateAppointmentDto) {
        try {
            return this.prisma.appointment.create({
                data: {
                    startTime: new Date(data.startTime),
                    endTime: new Date(data.endTime),
                    room: {
                        connect: {
                            id: data.roomId,
                        },
                    },
                    user: {
                        connect: {
                            id: data.userId,
                        },
                    },
                }
                ,
            })
        } catch (error) {
            throw error
        }
    }

    async update(
        appointmentId: string,
        dto: UpdateAppointmentDto,
    ) {
        try {
            return this.prisma.appointment.update({
                where: {
                    id: appointmentId,
                },
                data: {
                    ...(dto.startTime && { startTime: new Date(dto.startTime) }),
                    ...(dto.endTime && { endTime: new Date(dto.endTime) }),
                    ...(dto.status && { status: dto.status }),
                    ...(dto.roomId && { roomId: dto.roomId }),
                },
            })
        } catch (error) {
            throw error
        }
    }


    async delete(appointmentId: string) {
        try {
            return this.prisma.appointment.delete({
                where: { id: appointmentId },
            })
        } catch (error) {
            throw error
        }
    }

    async hasConflict(roomId: string, startTime: Date, endTime: Date) {
        return this.prisma.appointment.findFirst({
            where: {
                roomId,

                status: {
                    not: 'CANCELED'
                },

                startTime: {
                    lt: endTime,
                },

                endTime: {
                    gt: startTime,
                },
            },
        })
    }
}