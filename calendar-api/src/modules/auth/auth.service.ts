import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '../../prisma/prisma.service'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    async register(data: {
        name: string
        email: string
        password: string
    }) {
        const userExists = await this.prisma.user.findUnique({
            where: { email: data.email },
        })

        if (userExists) {
            throw new BadRequestException('User already exists')
        }

        const hash = await bcrypt.hash(data.password, 10)

        const user = await this.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                role: 'USER',
                password: hash,
            },
        })

        const token = await this.generateToken(user.id)


        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            token,
        }
    }

    async login(email: string, password: string) {
        const user = await this.prisma.user.findUnique({
            where: { email },
        })

        if (!user) {
            throw new UnauthorizedException('Invalid credentials')
        }

        const passwordMatch = await bcrypt.compare(password, user.password)

        if (!passwordMatch) {
            throw new UnauthorizedException('Invalid credentials')
        }

        const token = await this.generateToken(user.id)

        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            token,
        }
    }

    async generateToken(userId: string) {
        return this.jwtService.sign({
            sub: userId,
        })
    }
}
