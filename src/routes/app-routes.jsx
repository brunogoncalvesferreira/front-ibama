import { Routes, Route } from 'react-router-dom'
import { Home } from '../pages/home.jsx'
import { SignIn } from '../pages/sign-in.jsx'
import { SignUp } from '../pages/sign-up.jsx'
import { NotFound } from '../pages/not-found.jsx'
import { ListImage } from '../pages/list-image.jsx'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-out" element={<SignUp />} />
      <Route path="/list-image" element={<ListImage />} />

      <Route path="*" exact={true} element={<NotFound />} />
    </Routes>
  )
}
