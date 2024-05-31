export function Loading() {
  return (
    <div className="flex items-center justify-center space-x-4">
      <div className="flex items-center space-x-2">
        <div className="h-6 w-6 animate-spin rounded-full border-4 border-white border-t-transparent" />
        <p className="text-white">Aguarde...</p>
      </div>
    </div>
  )
}
