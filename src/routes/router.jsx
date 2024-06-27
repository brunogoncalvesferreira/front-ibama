import { AuthRoutes } from './auth-routes'
import { AppRoutes } from './app-routes'
import { useAuth } from '../hook/auth'
import { useEffect } from 'react'
import { api } from '../api/axios'

export function Router() {
  const { user, signOut } = useAuth()

  console.log(user)

  useEffect(() => {
    api.get('/users/validated').catch((error) => {
      if (error.response?.status === 401) {
        signOut()
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>{user ? <AppRoutes /> : <AuthRoutes />}</>
}
