import { AxiosResponse } from '@nestjs/terminus/dist/health-indicator/http/axios.interfaces'
import { AxiosError } from '@nestjs/terminus/dist/errors/axios.error'
import { binding, given, then, when } from 'cucumber-tsflow'
import { assert } from 'chai'
import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()

@binding()
export class AuthNotAuthorizedSteps {
  private serverHost = process.env.HOST
  private serverPort = process.env.PORT
  private result: AxiosResponse | null = null
  private error: AxiosError | null = null
  private apiLink = ''

  @given('api link {string}')
  public givenApiLink(link: string): void {
    this.apiLink = link
  }

  @when('use given link to make a {string} api request')
  public async useGivenLink(method: string): Promise<void> {
    try {
      this.result = await axios({ method, url: this.serverHost + ':' + this.serverPort + '/api/' + this.apiLink })
    } catch (e) {
      this.error = e
    }
  }

  @then('I should get {string}')
  public checkStatus(status: string): void {
    switch (status) {
      case '200': {
        if (this.result) {
          assert.equal(String(this.result.status), status)
        }
        break
      }
      default: {
        if (this.error) {
          assert.equal(this.error.response.status, status)
        }
        break
      }
    }
  }
}
