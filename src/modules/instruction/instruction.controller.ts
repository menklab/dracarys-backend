import { ApiBadRequestResponse, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
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
  @ApiForbiddenResponse()
  @ApiInternalServerErrorResponse()
  public async getAll(@Query('programId') programId: number): Promise<InstructionDto[]> {
    return this.instructionService.getAll(programId)
  }

  @Get(':id')
  @ApiForbiddenResponse()
  @ApiInternalServerErrorResponse()
  public async get(@Param('id') id: number): Promise<InstructionDto> {
    return this.instructionService.get(id)
  }

  @Post()
  @ApiForbiddenResponse()
  @ApiInternalServerErrorResponse()
  @ApiNotFoundResponse(SWAGGER_OPTIONS.error)
  @ApiBadRequestResponse(SWAGGER_OPTIONS.error)
  public async create(@Body() createInstructionDto: CreateInstructionDto): Promise<InstructionDto> {
    return this.instructionService.create(createInstructionDto)
  }

  @Patch(':id')
  @ApiForbiddenResponse()
  @ApiInternalServerErrorResponse()
  @ApiNotFoundResponse(SWAGGER_OPTIONS.error)
  @ApiBadRequestResponse(SWAGGER_OPTIONS.error)
  public async update(@Param('id') id: number, @Body() updateInstructionDto: UpdateInstructionDto): Promise<InstructionDto> {
    return this.instructionService.update(id, updateInstructionDto)
  }

  @Delete(':id')
  @ApiForbiddenResponse()
  @ApiInternalServerErrorResponse()
  public async delete(@Param('id') id: number): Promise<void> {
    return this.instructionService.delete(id)
  }
}
