import { Controller, Get,Req } from '@nestjs/common';
import { AppService } from './app.service';
import {Request} from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()

  getHello(@Req() req: Request): void {
      console.log(`${req.protocol}://${req.get('Host')}${req.originalUrl}`);
  }
}
