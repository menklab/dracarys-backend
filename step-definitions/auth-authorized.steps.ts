import { AxiosResponse } from '@nestjs/terminus/dist/health-indicator/http/axios.interfaces'
import { AxiosError } from '@nestjs/terminus/dist/errors/axios.error'
import { binding, given, then, when } from 'cucumber-tsflow'
import { assert } from 'chai'
import dotenv from 'dotenv'
import axios from 'axios'
import { Auth } from '../src/common/utils/auth'

dotenv.config()

@binding()
export class AuthAuthorizedSteps {
  private serverHost = process.env.HOST
  private serverPort = process.env.PORT
  private result: AxiosResponse | null = null
  private error: AxiosError | null = null
  private apiLink = ''

  @given('link {string}')
  public givenApiLink(link: string): void {
    this.apiLink = link
  }

  @when('use link to make a {string} api request')
  public async useGivenLink(method: string): Promise<void> {
    const cookie = await Auth.login()
    if (cookie) {
      try {
        this.result = await axios({
          method,
          url: `${this.serverHost}:${this.serverPort}/api/${this.apiLink}`,
          headers: {
            Cookie: `${cookie};`,
          },
        })
      } catch (e) {
        this.error = e
      }
    }
  }

  @then('I should get response {string}')
  public checkStatus(status: string): void {
    assert.equal(this.error, null)
    assert.equal(this.result !== null, true)
    assert.equal(String(this.result?.status), status)
  }
}
