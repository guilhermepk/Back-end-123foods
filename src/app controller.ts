import { Controller, Get, Post, Res, UseGuards,Request } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
import { AuthGuard } from '@nestjs/passport';
@Controller()
export class AppController {
  @Get()
  root(@Res() res: Response): void {
    res.sendFile(join(__dirname, '.', 'public', 'index.html'));
  }
  @UseGuards(AuthGuard('local'))
 @Post('auth/login')
 async login(@Request() req){
  return req.user;
 }
}