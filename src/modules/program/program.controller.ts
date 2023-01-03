import { ApiBadRequestResponse, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Delete, Get, Param, Patch, Post, Session, UseGuards } from '@nestjs/common'
import { CreateProgramDto } from './dtos/create-program/create-program.dto'
import { UpdateProgramDto } from './dtos/update-program/update-program.dto'
import { toProgramDto, toProgramsDto } from './mappers/program.mapper'
import { AuthGuard } from '../app/guards/auth.guard'
import { ProgramService } from './program.service'
import { ProgramDto } from './dtos/program.dto'
import { SWAGGER_OPTIONS } from '../../common'

@ApiTags('Program')
@UseGuards(AuthGuard)
@Controller('program')
export class ProgramController {
  constructor(private readonly programService: ProgramService) { }

  @Get()
  @ApiForbiddenResponse()
  @ApiInternalServerErrorResponse()
  public async getAll(@Session() session: Record<string, any>): Promise<ProgramDto[]> {
    const programs = await this.programService.getAllByUserId(session.userId)

    return toProgramsDto(programs)
  }

  @Post()
  @ApiForbiddenResponse()
  @ApiInternalServerErrorResponse()
  @ApiNotFoundResponse(SWAGGER_OPTIONS.error)
  @ApiBadRequestResponse(SWAGGER_OPTIONS.error)
  public async create(@Session() session: Record<string, any>, @Body() createProgramDto: CreateProgramDto): Promise<ProgramDto> {
    const program = await this.programService.create(session.userId, createProgramDto)

    return toProgramDto(program)
  }

  @Patch(':id')
  @ApiForbiddenResponse()
  @ApiInternalServerErrorResponse()
  @ApiNotFoundResponse(SWAGGER_OPTIONS.error)
  @ApiBadRequestResponse(SWAGGER_OPTIONS.error)
  public async update(@Param('id') id: number, @Body() updateProgramDto: UpdateProgramDto): Promise<ProgramDto> {
    const program = await this.programService.update(id, updateProgramDto)

    return toProgramDto(program)
  }

  @Delete(':id')
  @ApiForbiddenResponse()
  @ApiInternalServerErrorResponse()
  public async delete(@Param('id') id: number): Promise<void> {
    return this.programService.delete(id)
  }
}
