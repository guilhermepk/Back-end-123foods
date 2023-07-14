import { Controller,Request, Get, Post, Body, Patch, Param, Delete, UseGuards, UploadedFile, UseInterceptors  } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
const storage = diskStorage({
  
  destination: './files',
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = extname(file.originalname);
    callback(null, uniqueSuffix + extension);
  },
});
@Controller('users')
export class UsersController {
  EntityManager: any;
  constructor(private readonly usersService: UsersService) {}
  

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() createUserDto: CreateUserDto) {
    const fileName = file.filename;
    createUserDto.image = fileName;
    const user = await this.usersService.create(createUserDto);
    return { user, fileName };
}
 
  
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOneById(+id);
  }
  


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @UseGuards(AuthGuard('local'))
 @Post('login')
 async login(@Request() req){
  return req.user;
 }
}
