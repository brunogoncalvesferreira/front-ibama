import logo from '../assets/logo.svg'

import { LogOut, Upload } from 'lucide-react'
import { useAuth } from '../hook/auth'
import { useState } from 'react'
import { toast } from 'sonner'
import { api } from '../api/axios'

import { Loading } from '../components/loading'
import { Link } from 'react-router-dom'
import { Footer } from '../components/footer'

export function Home() {
  const [image, setImage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { signOut } = useAuth()

  function handleFileChange(event) {
    const selectedImage = event.target.files[0]
    setImage(selectedImage)
  }

  async function handleUpload(event) {
    event.preventDefault()

    if (image === null) {
      return toast.error('Selecione uma imagem para fazer upload')
    }

    const data = new FormData()
    data.append('image', image, image.name)

    setIsLoading(true)
    try {
      await api.post('/images', data).then(() => {
        toast.success('Imagem enviada com sucesso!')
        setIsLoading(false)
      })
    } catch (error) {
      if (error) {
        setIsLoading(false)
        toast.error(error.response.data.message)
      } else {
        setIsLoading(false)
        toast.error('Erro inesperado. Tente novamente mais tarde!')
      }
    }
  }
  return (
    <div className="relative flex items-center justify-center min-h-screen">
      <img
        className="w-32 absolute top-0 left-0 p-4 md:m-0 mb-3"
        src={logo}
        alt="Logo da empresa Vortice Corporation"
      />

      <div className="absolute top-0 right-0 p-4 md:m-0 mb-3 flex items-center gap-2">
        <Link
          className="text-sm  text-gray-500 hover:text-gray-700 border-r border-gray-400 pr-2"
          to={'/list-image'}
        >
          Imagens
        </Link>

        <button
          onClick={signOut}
          className="flex items-center gap-1 text-sm  text-gray-500 hover:text-gray-700"
        >
          Sair
          <LogOut className="size-5" />
        </button>
      </div>
      <div>
        <h1 className="md:text-4xl text-xl text-gray-700 text-center font-bold">
          Upload de imagens
        </h1>

        <div className="relative">
          <form className="flex flex-col space-y-5 md:w-[30vw] w-full px-4">
            <div className="flex flex-col items-center justify-center border-dashed h-48 border-2 border-gray-400/20 rounded-md p-4 text-center">
              <input
                type="file"
                multiple
                className="w-full h-full opacity-0"
                onChange={handleFileChange}
              />

              <div className="flex flex-col gap-3 items-center justify-center absolute -z-20">
                <Upload className="w-8 h-8 text-gray-400" />
                <p className="text-gray-400">
                  Clique para selecionar uma imagem
                </p>
              </div>
            </div>

            <button
              onClick={handleUpload}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {isLoading ? <Loading /> : 'Enviar imagem'}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  )
}
