import { Injectable, Inject, HttpException, HttpStatus, forwardRef } from '@nestjs/common';
import { ResultDto } from 'src/dto/result.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Token } from './token.entity';
import { AuthService } from 'src/auth/auth.service';
import {Users} from "../users/entities/users.entity";
import {UsersService} from "../users/users.service";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class TokenService {
  constructor(
      @InjectRepository(Token)
    private tokenRepository: Repository<Token>,
    private usersService: UsersService,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService
  ) {}

  async save(hash: string, username: string){
    let objToken = await this.tokenRepository.findOne({ where: { username: username } });
    if (objToken){
      this.tokenRepository.update(objToken.id, {
        hash: hash
      })
    }else{
      this.tokenRepository.insert({
        hash: hash,
        username: username
      })
    }
  }

  async refreshToken(oldToken: string){
    let objToken = await this.tokenRepository.findOne({ where: { hash: oldToken } });
    if (objToken){
      let user = await this.usersService.findOne(objToken.username)
      return this.authService.login(user)
    }else{
      return new HttpException({
        errorMessage: 'Token inválido'
      }, HttpStatus.UNAUTHORIZED)
    }
  }

  async getUsuarioByToken(token: string): Promise<Users>{
    token = token.replace("Bearer ","").trim()
    let objToken: Token = await this.tokenRepository.findOne({ where: { hash: token } });
    if (objToken){
      let user = await this.usersService.findOne(objToken.username)
      return user
    }else{
      return null
    }
  }
}