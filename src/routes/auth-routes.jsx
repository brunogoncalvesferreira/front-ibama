import { Routes, Route, Navigate } from 'react-router-dom'
import { SignIn } from '../pages/sign-in'
import { SignUp } from '../pages/sign-up'

export function AuthRoutes() {
  const user = localStorage.getItem('@ibama:user')
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />

      {user && <Route path="*" element={<Navigate to="/" />} />}
    </Routes>
  )
}
