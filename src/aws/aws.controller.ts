import { Controller, Post, Req, Res, UseGuards,UploadedFile ,UseInterceptors } from '@nestjs/common';

import { FileInterceptor } from "@nestjs/platform-express";
import { AwsService } from './aws.service';


@Controller('/v1/aws')
export class AwsController {
  constructor(private readonly awsService: AwsService) {}

    @Post('/upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
       return this.awsService.uploadFile(file)
        // console.log(file)

    }
    
}