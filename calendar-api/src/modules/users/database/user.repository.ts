import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../../prisma/prisma.service'
import { UpdateUserDto } from '../dto/update-user.dto'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserRepository {
    constructor(private prisma: PrismaService) { }

    async findById(userId: string) {
        try {
            return this.prisma.user.findUnique({
                where: { id: userId },
            })
        } catch (error) {
            throw error
        }
    }

    async update(userId: string, data: UpdateUserDto) {
        try {
            const updateData: any = { ...data }

            if (data.password) {
                updateData.password = await bcrypt.hash(data.password, 10)
            }

            return this.prisma.user.update({
                where: { id: userId },
                data: updateData,
            })
        } catch (error) {
            throw error
        }
    }

    async delete(userId: string) {
        try {
            return this.prisma.user.delete({
                where: { id: userId },
            })
        } catch (error) {
            throw error
        }
    }
}