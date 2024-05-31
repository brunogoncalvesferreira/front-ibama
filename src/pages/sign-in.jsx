import { Link } from 'react-router-dom'

import logo from '../assets/logo.svg'
import { useState } from 'react'
import { toast } from 'sonner'

import { useAuth } from '../hook/auth'
import { Loading } from '../components/loading'

export function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { signIn } = useAuth()

  async function handleSignIn(event) {
    event.preventDefault()

    if (!email || !password) {
      return toast.error('Preencha todos os campos')
    }

    setIsLoading(true)

    await signIn({ email, password })
      .then(() => {
        toast.success('Login efetuado com sucesso!')
        setIsLoading(false)
      })
      .catch((error) => {
        if (error) {
          setIsLoading(false)
          toast.error(error.response.data.message)
        } else {
          setIsLoading(false)
          toast.error('Erro inesperado. Tente novamente mais tarde!')
        }
        setIsLoading(false)
      })
  }

  return (
    <div className="flex items-center justify-center h-screen relative">
      <img
        className="w-32 absolute top-0 left-0 p-4 md:m-0 mb-3"
        src={logo}
        alt="Logo da empresa Vortice Corporation"
      />
      <div className="md:w-1/3 w-full px-5">
        <h1 className="md:text-3xl text-lg text-gray-700 font-bold">
          Seja bem vindo
        </h1>
        <p className="text-gray-500 my-3">Faça login em sua conta</p>

        <form className="bg-white p-4 space-y-5 shadow">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">E-mail</label>
            <input
              className="bg-transparent p-2 border border-gray-600/20 rounded-md"
              type="text"
              placeholder="Digite seu e-mail"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Senha</label>
            <input
              className="bg-transparent p-2 border border-gray-600/20 rounded-md"
              type="password"
              placeholder="Digite sua senha"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              autoComplete="off"
            />
          </div>

          <button
            onClick={handleSignIn}
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 font-bold"
          >
            {isLoading ? <Loading /> : 'Entrar'}
          </button>

          <p className="text-center text-sm">
            Não tem uma conta?{' '}
            <Link className="text-blue-500 font-bold" to="/register">
              Cadastre-se
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
