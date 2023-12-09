import { Outlet } from 'react-router-dom'
import styles from './style.module.scss'
import { Box } from '@mui/material'

const MainLayout = () => {
  return (
    <div className={styles.layout}>
      <Box bgcolor="background.page" className={styles.content}>
        <Outlet />
      </Box>
    </div>
  )
}

export default MainLayout
