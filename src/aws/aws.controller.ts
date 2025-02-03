import { Controller, Post, Req, Res, UseGuards,UploadedFile ,UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags, ApiBearerAuth } from "@nestjs/swagger";

import { FileInterceptor } from "@nestjs/platform-express";
import { AwsService } from './aws.service';


@Controller('/v1/r2')
@ApiTags("AWS File Upload")

export class AwsController {
  constructor(private readonly awsService: AwsService) {}

  @ApiOperation({
    summary: "R2 FILE UPLOAD API",
    description: "R2 파일 업로드 API",
  })
    @Post('/upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
       const res= this.awsService.uploadFile(file)
      return res; 
       // console.log(file)

    }
    
}