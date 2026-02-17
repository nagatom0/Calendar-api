import { IsOptional, IsString } from 'class-validator'

export class CreateAppointmentDto {

    @IsString()
    startTime: string

    @IsString()
    endTime: string

    @IsString()
    userId: string

    @IsString()
    roomId: string
}
