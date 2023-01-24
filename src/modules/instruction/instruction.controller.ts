import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'
import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { UpdateInstructionDto } from './dtos/update-instruction/update-instruction.dto'
import { CreateInstructionDto } from './dtos/create-instruction/create-instruction.dto'
import { InstructionService } from './instruction.service'
import { InstructionDto } from './dtos/instruction.dto'
import { AuthGuard } from '../app/guards/auth.guard'
import { SWAGGER_OPTIONS } from 'src/common'

@ApiTags('Instruction')
@UseGuards(AuthGuard)
@Controller('instruction')
export class InstructionController {
  constructor(private readonly instructionService: InstructionService) {}

  @Get()
  @ApiForbiddenResponse(SWAGGER_OPTIONS.forbidden)
  @ApiInternalServerErrorResponse(SWAGGER_OPTIONS.serverError)
  public async getAll(@Query('programId') programId: number): Promise<InstructionDto[]> {
    return this.instructionService.getAll(programId)
  }

  @Post()
  @ApiForbiddenResponse(SWAGGER_OPTIONS.forbidden)
  @ApiInternalServerErrorResponse(SWAGGER_OPTIONS.serverError)
  @ApiNotFoundResponse(SWAGGER_OPTIONS.error)
  @ApiBadRequestResponse(SWAGGER_OPTIONS.error)
  public async create(@Body() createInstructionDto: CreateInstructionDto): Promise<InstructionDto> {
    return this.instructionService.create(createInstructionDto)
  }

  @Patch(':id')
  @ApiForbiddenResponse(SWAGGER_OPTIONS.forbidden)
  @ApiInternalServerErrorResponse(SWAGGER_OPTIONS.serverError)
  @ApiNotFoundResponse(SWAGGER_OPTIONS.error)
  @ApiBadRequestResponse(SWAGGER_OPTIONS.error)
  public async update(@Param('id') id: number, @Body() updateInstructionDto: UpdateInstructionDto): Promise<InstructionDto> {
    return this.instructionService.update(id, updateInstructionDto)
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiForbiddenResponse(SWAGGER_OPTIONS.forbidden)
  @ApiInternalServerErrorResponse(SWAGGER_OPTIONS.serverError)
  @ApiNoContentResponse(SWAGGER_OPTIONS.noContent)
  public async delete(@Param('id') id: number): Promise<void> {
    return this.instructionService.delete(id)
  }

  @Get('generate-code')
  @ApiForbiddenResponse(SWAGGER_OPTIONS.forbidden)
  @ApiInternalServerErrorResponse(SWAGGER_OPTIONS.serverError)
  @ApiOkResponse(SWAGGER_OPTIONS.instruction.generateCodeOk)
  public async generateCode(@Query('programId') programId: number): Promise<string[]> {
    return this.instructionService.generateCode(programId)
  }

  @Get(':id')
  @ApiForbiddenResponse(SWAGGER_OPTIONS.forbidden)
  @ApiInternalServerErrorResponse(SWAGGER_OPTIONS.serverError)
  public async get(@Param('id') id: number): Promise<InstructionDto> {
    return this.instructionService.get(id)
  }
}
