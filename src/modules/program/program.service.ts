import {Injectable, NotFoundException} from "@nestjs/common";
import {Program} from "../../orm/entities";
import {CreateProgramDto} from "./dtos/create-program/create-program.dto";
import {UserService} from "../user/user.service";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {UpdateProgramDto} from "./dtos/update-program/update-program.dto";

@Injectable()
export class ProgramService {

  constructor(
    @InjectRepository(Program)
    private readonly programRepository: Repository<Program>,
    private readonly userService: UserService,
  ) {
  }


  public async create(userId: number, createProgramDto: CreateProgramDto): Promise<Program> {
    const user = await this.userService.findById(userId)
    if (!user) {
      // TODO: put to ERROR_MESSAGES
     throw new NotFoundException('user not found')
    }
    createProgramDto.user = user
    return await this.programRepository.save(createProgramDto)
  }

  public async update(id: number, updateProgramDto: UpdateProgramDto): Promise<Program> {
    const program = await this.programRepository.findOne({
      where: { id }
    })
    if (!program) {
      // TODO: place to ERRORS_MESSAGES
      throw new NotFoundException('program not found')
    }
    return this.programRepository.save({
      ...program,
      ...updateProgramDto,
    })
  }

  public async getAllByUserId(userId: number): Promise<Program[]> {
    return this.programRepository.find({
      where: {
        user: {
          id: userId
        }
      }
    });
  }

  public async delete(id: number): Promise<void> {
    console.log(id)
    await this.programRepository.delete(id);
  }

}
