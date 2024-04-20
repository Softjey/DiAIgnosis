import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { StartConsultationDto } from './dtos/start-consultation.dto';
import { ConsultationService } from './consultation.service';
import { AnswerDto } from './dtos/answer.dto';

@Controller('consultation')
export class ConsultationController {
  constructor(private readonly consultationService: ConsultationService) {}

  @Post('start')
  start(@Body() { patientComplaint }: StartConsultationDto) {
    return this.consultationService.start(patientComplaint);
  }

  @Post('answer')
  answer(@Body() answerDto: AnswerDto) {
    return this.consultationService.answer(answerDto);
  }

  @Get('result')
  result(@Query('consultationId') consultationId: string) {
    return this.consultationService.getResults(consultationId);
  }
}
