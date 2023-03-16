import nacl from 'tweetnacl'
import dotenv from 'dotenv'
import axios from 'axios'
import bs58 from 'bs58'

dotenv.config()

export class Auth {
  static async login(): Promise<string> {
    const serverHost = process.env.HOST
    const serverPort = process.env.PORT
    let cookie = ''

    const requestMessage = await axios({
      method: 'GET',
      url: `${serverHost}:${serverPort}/api/auth/requestMessage`,
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
      url: `${serverHost}:${serverPort}/api/auth/validateMessage`,
      data,
      headers: {
        Cookie: `${cookie};`,
      },
    })

    if (validateMessage.data === false) {
      cookie = ''
    }

    return cookie
  }
}
