import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

@Injectable()
export class AwsService {
  s3Client: S3Client;
  constructor(private configService: ConfigService) {
    // AWS S3 클라이언트 초기화. 환경 설정 정보를 사용하여 AWS 리전, Access Key, Secret Key를 설정.
    this.s3Client = new S3Client({
      region: "auto", // AWS Region
      endpoint: this.configService.get("R2_ENDPOINT"),
      credentials: {
        accessKeyId: this.configService.get("R2_ACCESS_KEY_ID"), // Access Key
        secretAccessKey: this.configService.get("R2_SECRET_ACCESS_KEY"), // Secret Key
      },
    });
  }
  public async uploadFile(file: Express.Multer.File) {
    try {
      const command = new PutObjectCommand({
        Bucket: this.configService.get("R2_BUCKET"),
        Key: file.originalname,
        Body: file.buffer,
        ContentType: `image/${file.originalname.split(".").pop()}`,
        // ACL: "public-read",
      });
      await this.s3Client.send(command);

      return {
        url: `${this.configService.get("R2_PUBLIC_URL")}/${file.originalname}`,
        name: file.originalname,
      };
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error; // 필요한 경우 에러를 다시 던질 수 있습니다.
    }
  }
}
