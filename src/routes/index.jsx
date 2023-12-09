import { Navigate, Route, Routes } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'
import Orders from '@/views/orders'

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/home/" element={<MainLayout />}>
        <Route index element={<Navigate to="/orders" />} />
        <Route path="orders" element={<Orders />} />
      </Route>
      <Route path="*" element={<Navigate to="/home/orders" />} />
    </Routes>
  )
}

export default AppRouter
