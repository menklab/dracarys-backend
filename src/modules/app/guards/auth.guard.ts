import { CanActivate, ExecutionContext, Injectable, NotFoundException } from '@nestjs/common'
import { businessException } from 'src/common/errors/utils/business-exception'
import { ERRORS } from 'src/common'

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const { session } = context.switchToHttp().getRequest()

    if (!session.isAuthorized) {
      throw new NotFoundException(businessException([ERRORS.auth.notAuthorized]))
    }

    return true
  }
}
