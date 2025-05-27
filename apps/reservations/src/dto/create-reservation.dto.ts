import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateReservationDto {
  @IsDate()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @Type(() => Date)
  startDate: Date;
  @IsDate()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @Type(() => Date)
  endDate: Date;
  @IsString()
  @IsNotEmpty()
  placeId: string;
  @IsString()
  @IsNotEmpty()
  invoiceId: string;
}
