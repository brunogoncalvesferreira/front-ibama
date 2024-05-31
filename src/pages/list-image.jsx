import { Link } from 'react-router-dom'
import { CardImage } from '../components/card-image'
import { useEffect, useState } from 'react'

import { api } from '../api/axios'

import { toast } from 'sonner'

export function ListImage() {
  const [image, setImage] = useState([])

  async function fetchImage() {
    const response = await api.get('/image')
    const data = await response.data
    setImage(data)

    if (response.status !== 200) {
      toast.error('Erro inesperado. Tente novamente mais tarde!')
    }
  }

  useEffect(() => {
    fetchImage()
  }, [])

  return (
    <div className="p-4 relative">
      <h1 className="md:text-4xl text-xl text-gray-700  font-bold">
        Lista de imagens
      </h1>

      <Link
        className="text-sm  text-gray-500 hover:text-gray-700 absolute top-0 right-0 p-4"
        to={'/'}
      >
        Voltar
      </Link>

      <div className="w-full mt-4 grid md:grid-cols-4 sm:grid-cols-3 gap-4">
        {image.map((image) => (
          <CardImage key={image.id} url={image.url} />
        ))}
      </div>
    </div>
  )
}
