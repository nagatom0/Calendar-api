import { Injectable } from "@nestjs/common";
import { UserRepository } from "../database/user.repository";

@Injectable()
export class FindUserByIdService {

    constructor(private readonly userRepository: UserRepository) { }

    async execute(userId: string) {
        const user = await this.userRepository.findById(userId)

        if (!user) {
            throw new Error('User not found')
        }

        return user
    }
}