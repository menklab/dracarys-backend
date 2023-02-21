import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger'
import { UpdateInstructionElementDto } from './dtos/update-instruction-element/update-instruction-element.dto'
import { CreateInstructionElementDto } from './dtos/create-instruction-element/create-instruction-element.dto'
import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { InstructionElementService } from './instruction-element.service'
import { InstructionElementDto } from './dtos/instruction-element.dto'
import { AuthGuard } from '../app/guards/auth.guard'
import { SWAGGER_OPTIONS } from 'src/common'
import { InstructionElementGenericTypeMap } from 'src/common/maps/instruction.element.generic.type.map'

@ApiTags('InstructionElement')
// @UseGuards(AuthGuard)
@Controller('instruction-element')
export class InstructionElementController {
  constructor(private readonly instructionElementService: InstructionElementService) {}

  @Get()
  @ApiForbiddenResponse(SWAGGER_OPTIONS.forbidden)
  @ApiInternalServerErrorResponse(SWAGGER_OPTIONS.serverError)
  public async getAll(@Query('instructionId') instructionId: number): Promise<InstructionElementDto[]> {
    return this.instructionElementService.getAll(instructionId)
  }

  @Get('generic-types')
  @ApiForbiddenResponse(SWAGGER_OPTIONS.forbidden)
  @ApiInternalServerErrorResponse(SWAGGER_OPTIONS.serverError)
  public async getGenericTypes(@Query('programId') programId: number): Promise<InstructionElementGenericTypeMap> {
    return this.instructionElementService.getGenericTypes(programId)
  }

  @Get(':id')
  @ApiForbiddenResponse(SWAGGER_OPTIONS.forbidden)
  @ApiInternalServerErrorResponse(SWAGGER_OPTIONS.serverError)
  public async get(@Param('id') id: number): Promise<InstructionElementDto> {
    return this.instructionElementService.get(id)
  }

  @Post()
  @ApiForbiddenResponse(SWAGGER_OPTIONS.forbidden)
  @ApiInternalServerErrorResponse(SWAGGER_OPTIONS.serverError)
  @ApiNotFoundResponse(SWAGGER_OPTIONS.error)
  @ApiBadRequestResponse(SWAGGER_OPTIONS.error)
  public async create(@Body() createInstructionElementDto: CreateInstructionElementDto): Promise<InstructionElementDto> {
    return this.instructionElementService.create(createInstructionElementDto)
  }

  @Patch(':id')
  @ApiForbiddenResponse(SWAGGER_OPTIONS.forbidden)
  @ApiInternalServerErrorResponse(SWAGGER_OPTIONS.serverError)
  @ApiNotFoundResponse(SWAGGER_OPTIONS.error)
  @ApiBadRequestResponse(SWAGGER_OPTIONS.error)
  public async update(@Param('id') id: number, @Body() updateInstructionElementDto: UpdateInstructionElementDto): Promise<InstructionElementDto> {
    return this.instructionElementService.update(id, updateInstructionElementDto)
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiForbiddenResponse(SWAGGER_OPTIONS.forbidden)
  @ApiInternalServerErrorResponse(SWAGGER_OPTIONS.serverError)
  @ApiNoContentResponse(SWAGGER_OPTIONS.noContent)
  public async delete(@Param('id') id: number): Promise<void> {
    return this.instructionElementService.delete(id)
  }
}
