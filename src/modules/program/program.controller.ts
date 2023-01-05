import { ApiBadRequestResponse, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Delete, Get, Param, Patch, Post, Session, UseGuards } from '@nestjs/common'
import { CreateProgramDto } from './dtos/create-program/create-program.dto'
import { UpdateProgramDto } from './dtos/update-program/update-program.dto'
import { AuthGuard } from '../app/guards/auth.guard'
import { ProgramService } from './program.service'
import { ProgramDto } from './dtos/program.dto'
import { SWAGGER_OPTIONS } from '../../common'

@ApiTags('Program')
@UseGuards(AuthGuard)
@Controller('program')
export class ProgramController {
  constructor(private readonly programService: ProgramService) {}

  @Get()
  @ApiForbiddenResponse()
  @ApiInternalServerErrorResponse()
  public async getAll(@Session() session: Record<string, any>): Promise<ProgramDto[]> {
    return this.programService.getAllByUserId(session.userId)
  }

  @Get(':id')
  @ApiForbiddenResponse()
  @ApiInternalServerErrorResponse()
  public async get(@Param('id') id: number, @Session() session: Record<string, any>): Promise<ProgramDto> {
    return this.programService.get(id)
  }

  @Post()
  @ApiForbiddenResponse()
  @ApiInternalServerErrorResponse()
  @ApiNotFoundResponse(SWAGGER_OPTIONS.error)
  @ApiBadRequestResponse(SWAGGER_OPTIONS.error)
  public async create(@Session() session: Record<string, any>, @Body() createProgramDto: CreateProgramDto): Promise<ProgramDto> {
    return this.programService.create(session.userId, createProgramDto)
  }

  @Patch(':id')
  @ApiForbiddenResponse()
  @ApiInternalServerErrorResponse()
  @ApiNotFoundResponse(SWAGGER_OPTIONS.error)
  @ApiBadRequestResponse(SWAGGER_OPTIONS.error)
  public async update(@Param('id') id: number, @Body() updateProgramDto: UpdateProgramDto): Promise<ProgramDto> {
    return this.programService.update(id, updateProgramDto)
  }

  @Delete(':id')
  @ApiForbiddenResponse()
  @ApiInternalServerErrorResponse()
  public async delete(@Param('id') id: number): Promise<void> {
    return this.programService.delete(id)
  }
}
