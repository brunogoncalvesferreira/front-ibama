export function CardImage({ url }) {
  return (
    <img
      className="w-full rounded-md hover:shadow-md"
      src={url}
      alt="Imagem salva no banco de dados"
    />
  )
}
