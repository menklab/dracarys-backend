import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const { session } = context.switchToHttp().getRequest()
    return !!session.isAuthorized
  }
}
