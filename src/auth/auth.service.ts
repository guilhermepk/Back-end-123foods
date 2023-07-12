import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'
@Injectable()
export class AuthService {
    constructor(private usersService:UsersService){}
    async validateUser(email: string, password: string): Promise<any> {
            const user = await this.usersService.findOne(email);
            if (user&& bcrypt.compareSync(password,user.password) ) {
            
            const { password, ...result } = user;
            // TODO: Generate a JWT and return it here
            // instead of the user object
            return result;
        }
}

}
