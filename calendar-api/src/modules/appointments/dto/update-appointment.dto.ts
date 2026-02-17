import { IsOptional, IsString } from 'class-validator'

export class UpdateAppointmentDto {
    @IsString()
    @IsOptional()
    startTime?: string

    @IsString()
    @IsOptional()
    endTime?: string

    @IsString()
    userId: string

    @IsString()
    @IsOptional()
    roomId?: string

    @IsString()
    @IsOptional()
    status?: "SCHEDULED" | "CANCELED" | "DONE"
}
