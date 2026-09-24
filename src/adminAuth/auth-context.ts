import { createContext } from 'react'
import type { AdminAuthContextValue } from './types'

export const AdminAuthContext = createContext<AdminAuthContextValue | null>(null)
