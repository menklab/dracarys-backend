import {Injectable} from "@nestjs/common";
import {Program} from "../../orm/entities";
import {CreateProgramDto} from "./dtos/create-program/create-program.dto";
import {UserService} from "../user/user.service";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class ProgramService {

  constructor(
    @InjectRepository(Program)
    private readonly programRepository: Repository<Program>,
    private readonly userService: UserService,
  ) {}


  public async create(userId: number, createProgramDto: CreateProgramDto): Promise<Program | null> {
    return null
  }

}
