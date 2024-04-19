import { Module } from '@nestjs/common';
import { OpenaiModule } from './openai/openai.module';
import { ConsultationModule } from './consultation/consultation.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      ignoreEnvFile: false,
    }),
    OpenaiModule,
    ConsultationModule,
  ],
})
export class AppModule {}
