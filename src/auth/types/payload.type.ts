import { Role } from 'src/users/roles'

export type Payload = {
  sub: number
  username: string
  email: string
  role: Role
}
