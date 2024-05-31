import { Link, useNavigate } from 'react-router-dom'

import logo from '../assets/logo.svg'
import { useState } from 'react'
import { toast } from 'sonner'

import { api } from '../api/axios'
import { Loading } from '../components/loading'

export function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  async function handleSignUp(event) {
    event.preventDefault()

    if (!name || !email || !password) {
      return toast.error('Preencha todos os campos')
    }

    setIsLoading(true)

    const data = { name, email, password }

    await api
      .post('/users', data)
      .then((response) => {
        if (response) {
          setIsLoading(false)
          toast.success('Cadastrado com sucesso!')
          navigate(-1)
        }
      })
      .catch((error) => {
        setIsLoading(false)
        toast.error(error.response.data.message)
      })
  }
  return (
    <div className="flex items-center justify-center h-screen relative">
      <img
        className="w-28 absolute bottom-0 left-0 p-4 md:m-0 mb-3"
        src={logo}
        alt="Logo da empresa Vortice Corporation"
      />
      <div className="md:w-1/3 w-full px-5">
        <h1 className="md:text-3xl text-lg text-gray-700 font-bold">
          Faça seu cadastro
        </h1>
        <p className="text-gray-500 my-3">
          Preencha os dados abaixo para continuar
        </p>

        <form className="bg-white p-4 space-y-5 shadow">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Nome</label>
            <input
              className="bg-transparent p-2 border border-gray-600/20 rounded-md"
              type="text"
              placeholder="Digite seu nome"
              onChange={(event) => setName(event.target.value)}
              value={name}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">E-mail</label>
            <input
              className="bg-transparent p-2 border border-gray-600/20 rounded-md"
              type="text"
              placeholder="Digite seu e-mail"
              onChange={(event) => setEmail(event.target.value)}
              value={email}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Senha</label>
            <input
              className="bg-transparent p-2 border border-gray-600/20 rounded-md"
              type="password"
              placeholder="Digite sua senha"
              onChange={(event) => setPassword(event.target.value)}
              value={password}
              autoComplete="off"
            />
          </div>

          <button
            onClick={handleSignUp}
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 font-bold"
          >
            {isLoading ? <Loading /> : 'Cadastrar'}
          </button>

          <p className="text-center text-sm">
            Ja tem uma conta?{' '}
            <Link className="text-blue-500 font-bold" to={-1}>
              Clique aqui
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
