import { Injectable } from '@nestjs/common'

@Injectable()
export class UsersService {
  getHealthCheck(): string {
    return 'users health check OK'
  }
}
