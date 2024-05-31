import { createContext, useContext, useEffect, useState } from 'react'
import { api } from '../api/axios'
import { toast } from 'sonner'

export const AuthContext = createContext({})

export function AuthContextProvider({ children }) {
  const [data, setData] = useState({})

  async function signIn({ email, password }) {
    try {
      const response = await api.post('/sessions', { email, password })
      const { user, token } = response.data

      localStorage.setItem('@ibama:user', JSON.stringify(user))
      localStorage.setItem('@ibama:token', token)

      api.defaults.headers.common.Authorization = `Bearer ${token}`
      setData({ user, token })
    } catch (error) {
      if (error) {
        toast.error(error.response.data.message)
      } else {
        toast.error('Erro inesperado. Tente novamente mais tarde!')
      }
    }
  }

  function signOut() {
    localStorage.removeItem('@ibama:user')
    localStorage.removeItem('@ibama:token')

    setData({})
  }

  useEffect(() => {
    const token = localStorage.getItem('@ibama:token')
    const user = localStorage.getItem('@ibama:user')

    if (token && user) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`
      setData({
        token,
        user: JSON.parse(user),
      })
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  return context
}
