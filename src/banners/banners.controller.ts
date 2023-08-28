import {
  Controller,
  Request,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { BannersService } from './banners.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { AuthGuard } from '@nestjs/passport';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as sharp from 'sharp';
import * as fs from 'fs-extra';
const storage = diskStorage({
  destination: './files',
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = extname(file.originalname);
    callback(null, uniqueSuffix + extension);
  },
});
@Controller('banners')
export class BannersController {
  EntityManager: any;
  constructor(private readonly bannersService: BannersService) {}

  @Post()
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() createBannerDto: CreateBannerDto,
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const fileName = `${uuidv4()}-${file.originalname}`;
    const uploadPath = './uploads/' + fileName;

    await sharp(file.path).resize(800, 300).toFile(uploadPath);

    await fs.remove(file.path);

    createBannerDto.image = fileName;
    const banner = await this.bannersService.create(createBannerDto);

    return { fileName };
  }

  @Get()
  findAll() {
    return this.bannersService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bannersService.remove(+id);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }
}
