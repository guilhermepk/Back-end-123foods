import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";
import {Users} from "../users/entities/users.entity";
import {TokenService} from "../token/token.service";


@Injectable()
export class AuthService {
    constructor(private usersService:UsersService,
                private jwtService: JwtService,
                private tokenService: TokenService){}
    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findOne(email);
        if (user && bcrypt.compareSync(password, user.password)) {

            const {password, ...result} = user;
            // TODO: Generate a JWT and return it here
            // instead of the user object
            return result;
        }
        return null;
    }
    async login(user:any) {
        const payload = {username: user.username, sub: user.userId};
        const token = this.jwtService.sign(payload)
        this.tokenService.save(token, user.email)
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    async loginToken(token: string) {
        let usuario: Users = await this.tokenService.getUsuarioByToken(token)
        if (usuario){
            return this.login(usuario)
        }else{
            return new HttpException({
                errorMessage: 'Token inválido'
            }, HttpStatus.UNAUTHORIZED)
        }
    }

}

