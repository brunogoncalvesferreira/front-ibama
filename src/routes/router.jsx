import { AuthRoutes } from './auth-routes'
import { AppRoutes } from './app-routes'
import { useAuth } from '../hook/auth'

export function Router() {
  const { user } = useAuth()
  return <>{user ? <AppRoutes /> : <AuthRoutes />}</>
}
