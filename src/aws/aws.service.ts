import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class AwsService {
    s3Client: S3Client;
    constructor(private configService: ConfigService) {
        // AWS S3 클라이언트 초기화. 환경 설정 정보를 사용하여 AWS 리전, Access Key, Secret Key를 설정.
        this.s3Client = new S3Client({
          region: this.configService.get('AWS_REGION'), // AWS Region
          credentials: {
            accessKeyId: this.configService.get('AWS_S3_ACCESS_KEY'), // Access Key
            secretAccessKey: this.configService.get('AWS_S3_SECRET_ACCESS_KEY'), // Secret Key
          },
        });
      }
    public async uploadFile(file:Express.Multer.File){
        console.log(file)
        const command = new PutObjectCommand({
            Bucket: this.configService.get('AWS_S3_BUCKET_NAME'), // S3 버킷 이름
            Key: file.originalname, // 업로드될 파일의 이름
            Body: file.buffer, // 업로드할 파일
            // ACL: 'public-read', // 파일 접근 권한
            ContentType: `image/${file.originalname.split('.').pop()}`, // 파일 타입
          });
        await this.s3Client.send(command);
        
        // 업로드된 이미지의 URL을 반환합니다.
        return `https://s3.${process.env.AWS_REGION}.amazonaws.com/${process.env.AWS_S3_BUCKET_NAME}/${file.originalname}`;
    
    }
}
