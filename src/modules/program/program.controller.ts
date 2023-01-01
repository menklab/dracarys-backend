import {Body, Controller, Delete, Get, Param, Patch, Post, Session, UseGuards} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiTags
} from "@nestjs/swagger";
import {CreateProgramDto} from "./dtos/create-program/create-program.dto";
import {ProgramService} from "./program.service";
import {Program} from "../../orm/entities";
import {AuthGuard} from "../app/guards/auth.guard";
import {UpdateProgramDto} from "./dtos/update-program/update-program.dto";
import {SWAGGER_OPTIONS} from "../../common";

@ApiTags('Program')
@Controller('program')
export class ProgramController {

  constructor(
    private readonly programService: ProgramService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiInternalServerErrorResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse(SWAGGER_OPTIONS.error)
  @ApiBadRequestResponse(SWAGGER_OPTIONS.error)
  public async create(
    @Session() session: Record<string, any>,
    @Body() createProgramDto: CreateProgramDto,
    ): Promise<Program> {
    return this.programService.create(session.userId, createProgramDto);
  }

  @Patch()
  @UseGuards(AuthGuard)
  @ApiInternalServerErrorResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse(SWAGGER_OPTIONS.error)
  @ApiBadRequestResponse(SWAGGER_OPTIONS.error)
  public async update(
    @Param('id') id: number,
    @Body() updateProgramDto: UpdateProgramDto
  ): Promise<Program> {
    return this.programService.update(id, updateProgramDto)
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiInternalServerErrorResponse()
  @ApiForbiddenResponse()
  public async getAll(
    @Session() session: Record<string, any>
  ): Promise<Program[]> {
    return this.programService.getAllByUserId(session.userId)
  }

  @Delete(':id')
  @ApiInternalServerErrorResponse()
  @ApiForbiddenResponse()
  public async delete(@Param('id') id: number): Promise<void> {
    return this.programService.delete(id)
  }





}
