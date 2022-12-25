import {ApiProperty} from "@nestjs/swagger";
import {User} from "../../../../orm/entities";

export class CreateProgramDto {
  @ApiProperty()
  name: string

  user?: User
}
