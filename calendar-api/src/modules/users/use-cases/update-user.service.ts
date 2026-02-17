import { Injectable } from '@nestjs/common';
import { UserRepository } from '../database/user.repository';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UpdateUserService {

    constructor(private readonly userRepository: UserRepository) { }

    async execute(userId: string, data: UpdateUserDto) {
        try {
            const user = await this.userRepository.findById(userId)

            if (!user) {
                throw new Error('User not found')
            }

            return this.userRepository.update(userId, data)
        } catch (error) {
            throw error
        }
    }
}
