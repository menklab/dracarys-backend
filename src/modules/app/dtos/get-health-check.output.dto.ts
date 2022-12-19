import { Expose } from 'class-transformer';

export class AppGetHealthOutput {
  @Expose()
  data: string;
}
