import { IsNotEmpty } from 'class-validator';

export class StartConsultationDto {
  @IsNotEmpty()
  patientComplaint: string;
}
