import { ApiBadRequestResponse, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiTags } from '@nestjs/swagger'
import { UpdateInstructionElementDto } from './dtos/update-instruction-element/update-instruction-element.dto'
import { CreateInstructionElementDto } from './dtos/create-instruction-element/create-instruction-element.dto'
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { InstructionElementService } from './instruction-element.service'
import { InstructionElementDto } from './dtos/instruction-element.dto'
import { AuthGuard } from '../app/guards/auth.guard'
import { SWAGGER_OPTIONS } from 'src/common'

@ApiTags('InstructionElement')
@UseGuards(AuthGuard)
@Controller('instruction-element')
export class InstructionElementController {
  constructor(private readonly instructionElementService: InstructionElementService) {}

  @Get()
  @ApiForbiddenResponse()
  @ApiInternalServerErrorResponse()
  public async getAll(@Query('instructionId') instructionId: number): Promise<InstructionElementDto[]> {
    return this.instructionElementService.getAll(instructionId)
  }

  @Get(':id')
  @ApiForbiddenResponse()
  @ApiInternalServerErrorResponse()
  public async get(@Param('id') id: number): Promise<InstructionElementDto> {
    return this.instructionElementService.get(id)
  }

  @Post()
  @ApiForbiddenResponse()
  @ApiInternalServerErrorResponse()
  @ApiNotFoundResponse(SWAGGER_OPTIONS.error)
  @ApiBadRequestResponse(SWAGGER_OPTIONS.error)
  public async create(@Body() createInstructionElementDto: CreateInstructionElementDto): Promise<InstructionElementDto> {
    return this.instructionElementService.create(createInstructionElementDto)
  }

  @Patch(':id')
  @ApiForbiddenResponse()
  @ApiInternalServerErrorResponse()
  @ApiNotFoundResponse(SWAGGER_OPTIONS.error)
  @ApiBadRequestResponse(SWAGGER_OPTIONS.error)
  public async update(@Param('id') id: number, @Body() updateInstructionElementDto: UpdateInstructionElementDto): Promise<InstructionElementDto> {
    return this.instructionElementService.update(id, updateInstructionElementDto)
  }

  @Delete(':id')
  @ApiForbiddenResponse()
  @ApiInternalServerErrorResponse()
  public async delete(@Param('id') id: number): Promise<void> {
    return this.instructionElementService.delete(id)
  }
}
