import { AxiosResponse } from '@nestjs/terminus/dist/health-indicator/http/axios.interfaces'
import { AxiosError } from '@nestjs/terminus/dist/errors/axios.error'
import { binding, given, then, when } from 'cucumber-tsflow'
import { assert } from 'chai'
import dotenv from 'dotenv'
import axios from 'axios'
import { Auth } from '../src/common/utils/auth'

dotenv.config()

@binding()
export class ModulesCrudSteps {
  private serverHost = process.env.HOST
  private serverPort = process.env.PORT
  private result: AxiosResponse | null = null
  private error: AxiosError | null = null
  private moduleName = ''
  private entityId = 0
  private cookie = ''
  private account: AxiosResponse | null = null
  private program: AxiosResponse | null = null
  private accountElement: AxiosResponse | null = null
  private instruction: AxiosResponse | null = null
  private instructionElement: AxiosResponse | null = null

  private async createEntity(createData: string, additionalData: object = {}): Promise<AxiosResponse | null> {
    this.result = await axios({
      method: 'POST',
      url: `${this.serverHost}:${this.serverPort}/api/${this.moduleName}`,
      headers: {
        Cookie: `${this.cookie};`,
      },
      data: Object.assign(JSON.parse(createData), additionalData),
    })

    this.entityId = this.result?.data.id

    return this.result
  }

  @when('delete newly created entity')
  public async deleteEntity(entityId: string): Promise<void> {
    try {
      this.result = await axios({
        method: 'DELETE',
        url: `${this.serverHost}:${this.serverPort}/api/${this.moduleName}/${entityId}`,
        headers: {
          Cookie: `${this.cookie};`,
        },
      })
    } catch (e) {
      this.error = e
    }
  }

  @given('module {string}')
  public async givenModuleName(module: string): Promise<void> {
    if (!this.cookie) {
      this.cookie = await Auth.login()
    }

    this.moduleName = module
  }

  @when('create new entity with {string} data in program module')
  public async createNewProgramEntity(createData: string): Promise<void> {
    try {
      this.program = await this.createEntity(createData)
    } catch (e) {
      this.error = e
    }
  }

  @when('create new entity with {string} data in account module')
  public async createNewAccountEntity(createData: string): Promise<void> {
    if (this.program) {
      try {
        this.account = await this.createEntity(createData, { programId: this.program.data.id })
      } catch (e) {
        this.error = e
      }
    }
  }

  @when('create new entity with {string} data in account-element module')
  public async createNewAccountElementEntity(createData: string): Promise<void> {
    if (this.account) {
      try {
        this.accountElement = await this.createEntity(createData, { accountId: this.account.data.id })
      } catch (e) {
        this.error = e
      }
    }
  }

  @when('create new entity with {string} data in instruction module')
  public async createNewInstructionEntity(createData: string): Promise<void> {
    if (this.program) {
      try {
        this.instruction = await this.createEntity(createData, { programId: this.program.data.id })
      } catch (e) {
        this.error = e
      }
    }
  }

  @when('create new entity with {string} data in instruction-element module')
  public async createNewInstructionElementEntity(createData: string): Promise<void> {
    if (this.instruction) {
      try {
        this.instructionElement = await this.createEntity(createData, { instructionId: this.instruction.data.id })
      } catch (e) {
        this.error = e
      }
    }
  }

  @when('read newly created entity')
  public async readNewEntity(): Promise<void> {
    try {
      this.result = await axios({
        method: 'GET',
        url: `${this.serverHost}:${this.serverPort}/api/${this.moduleName}/${this.entityId.toString()}`,
        headers: {
          Cookie: `${this.cookie};`,
        },
      })
    } catch (e) {
      this.error = e
    }
  }

  @when('update newly created entity with {string} data')
  public async updateNewEntity(updateData: string): Promise<void> {
    try {
      this.result = await axios({
        method: 'PATCH',
        url: `${this.serverHost}:${this.serverPort}/api/${this.moduleName}/${this.entityId.toString()}`,
        headers: {
          Cookie: `${this.cookie};`,
        },
        data: JSON.parse(updateData),
      })
    } catch (e) {
      this.error = e
    }
  }

  @when('update newly created instruction-element entity with {string} data')
  public async updateNewInstructionElementEntity(updateData: string): Promise<void> {
    if (this.instruction) {
      try {
        this.result = await axios({
          method: 'PATCH',
          url: `${this.serverHost}:${this.serverPort}/api/${this.moduleName}/${this.entityId.toString()}`,
          headers: {
            Cookie: `${this.cookie};`,
          },
          data: Object.assign(JSON.parse(updateData), { instructionId: this.instruction.data.id }),
        })
      } catch (e) {
        this.error = e
      }
    }
  }

  @when('delete newly created account entity')
  public async deleteAccountEntity(): Promise<void> {
    if (this.account) {
      await this.deleteEntity(this.account.data.id)
    }
  }

  @when('delete newly created program entity')
  public async deleteProgramEntity(): Promise<void> {
    if (this.program) {
      await this.deleteEntity(this.program.data.id)
    }
  }

  @when('delete newly created account-element entity')
  public async deleteAccountElementEntity(): Promise<void> {
    if (this.accountElement) {
      await this.deleteEntity(this.accountElement.data.id)
    }
  }

  @when('delete newly created instruction entity')
  public async deleteInstructionEntity(): Promise<void> {
    if (this.instruction) {
      await this.deleteEntity(this.instruction.data.id)
    }
  }

  @when('delete newly created instruction-element entity')
  public async deleteInstructionElementEntity(): Promise<void> {
    if (this.instructionElement) {
      await this.deleteEntity(this.instructionElement.data.id)
    }
  }

  @then('I get response {string}')
  public checkResponse(status: string): void {
    assert.equal(this.error, null)
    assert.equal(this.result !== null, true)
    assert.equal(String(this.result?.status), status)
  }
}
