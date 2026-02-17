import { Injectable } from "@nestjs/common";
import { UserRepository } from "../database/user.repository";

@Injectable()
export class DeleteUserService {

    constructor(private readonly userRepository: UserRepository) { }

    async execute(userId: string) {
        try {
            const user = await this.userRepository.findById(userId)

            if (!user) {
                throw new Error('User not found')
            }

            return this.userRepository.delete(userId)

        } catch (error) {
            throw error
        }
    }
}