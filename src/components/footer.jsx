export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="absolute bottom-0 left-0 right-0 p-4 w-full text-center">
      <p className="text-sm text-gray-500">
        Copyright © {year} Vortice Corporation
      </p>
    </footer>
  )
}
