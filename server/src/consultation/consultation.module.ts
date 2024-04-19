import { Module } from '@nestjs/common';
import { ConsultationController } from './consultation.controller';
import { OpenaiModule } from 'src/openai/openai.module';
import { ConsultationService } from './consultation.service';

@Module({
  imports: [OpenaiModule],
  providers: [ConsultationService],
  controllers: [ConsultationController],
})
export class ConsultationModule {}
