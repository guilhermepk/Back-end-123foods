import { Controller,Request, Get, Post, Body, Patch, Param, Delete, UseGuards, UploadedFile, UseInterceptors, BadRequestException  } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs-extra';
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
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() createUserDto: CreateUserDto) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const fileName = `${uuidv4()}-${file.originalname}`;
    const uploadPath = './uploads/' + fileName;

    await fs.move(file.path, uploadPath);
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
  

  @Patch(':id/upload')
async uploadupdateFile(@Param('id') id: string, @UploadedFile() file: Express.Multer.File, @Body() updateUserDto: UpdateUserDto) {
  if (!file) {
    throw new BadRequestException('No file uploaded');
  }

  const fileName = `${uuidv4()}-${file.originalname}`;
  const uploadPath = './uploads/' + fileName;

  await fs.move(file.path, uploadPath);
  updateUserDto.image = fileName;
  const user = await this.usersService.updateimage(+id, updateUserDto);

  return { user, fileName };
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
