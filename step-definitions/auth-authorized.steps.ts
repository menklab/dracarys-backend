import { AxiosResponse } from '@nestjs/terminus/dist/health-indicator/http/axios.interfaces'
import { AxiosError } from '@nestjs/terminus/dist/errors/axios.error'
import { binding, given, then, when } from 'cucumber-tsflow'
import { assert } from 'chai'
import nacl from 'tweetnacl'
import dotenv from 'dotenv'
import axios from 'axios'
import bs58 from 'bs58'

dotenv.config()

@binding()
export class AuthAuthorizedSteps {
  private serverHost = process.env.HOST
  private serverPort = process.env.PORT
  private result: AxiosResponse | null = null
  private error: AxiosError | null = null
  private apiLink = ''

  private async login(): Promise<string> {
    let cookie = ''

    try {
      const requestMessage = await axios({
        method: 'GET',
        url: this.serverHost + ':' + this.serverPort + '/api/auth/requestMessage',
        withCredentials: true,
      })

      cookie = requestMessage.headers['set-cookie'] ? requestMessage.headers['set-cookie'].join('; ') : ''

      const message = requestMessage?.data.message
      const encodedMessage = new TextEncoder().encode(message)
      const keyPairs = nacl.sign.keyPair()
      const signature = nacl.sign.detached(encodedMessage, keyPairs.secretKey)
      const signatureString = btoa(String.fromCharCode.apply(null, signature))
      const pubKeyString = bs58.encode(keyPairs.publicKey)

      const data = {
        pubKey: pubKeyString,
        message,
        signature: signatureString,
      }

      const validateMessage = await axios({
        method: 'POST',
        url: this.serverHost + ':' + this.serverPort + '/api/auth/validateMessage',
        data,
        headers: {
          Cookie: `${cookie};`,
        },
      })

      if (validateMessage.data === false) {
        cookie = ''
      }
    } catch (e) {
      this.error = e
    }

    return cookie
  }

  @given('link {string}')
  public givenApiLink(link: string): void {
    this.apiLink = link
  }

  @when('use link to make a {string} api request')
  public async useGivenLink(method: string): Promise<void> {
    const cookie = await this.login()
    if (cookie) {
      try {
        this.result = await axios({
          method,
          url: this.serverHost + ':' + this.serverPort + '/api/' + this.apiLink,
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
