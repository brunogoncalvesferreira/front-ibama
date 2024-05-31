import { BrowserRouter } from 'react-router-dom'
import { Router } from './routes/router'
import { Toaster } from 'sonner'
import { AuthContextProvider } from './hook/auth'

export function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Router />
        <Toaster richColors duration={2000} />
      </AuthContextProvider>
    </BrowserRouter>
  )
}
