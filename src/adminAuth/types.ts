import type { AdminUser } from '../lib/api'

export type AdminAuthContextValue = {
  user: AdminUser | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  refresh: () => Promise<void>
  updateProfile: (body: {
    name?: string
    email?: string
    currentPassword?: string
    newPassword?: string
  }) => Promise<void>
}
