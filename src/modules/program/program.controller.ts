import {Body, Controller, Post, Session} from "@nestjs/common";
import {ApiTags} from "@nestjs/swagger";
import {CreateProgramDto} from "./dtos/create-program/create-program.dto";
import {ProgramService} from "./program.service";
import {Program} from "../../orm/entities";

@ApiTags('Program')
@Controller('program')
export class ProgramController {

  constructor(
    private readonly programService: ProgramService,
  ) {}

  @Post()
  public async create(
    @Session() session: Record<string, any>,
    @Body() createProgramDto: CreateProgramDto,
    ): Promise<Program | null> {
    return this.programService.create(5, createProgramDto);
  }

}
