import { Box } from '@mui/material'
import styles from './style.module.scss'

const Header = ({
  title = '',
  subtitle,
  extra,
  children,
  sticky,
  ...props
}) => {
  return (
    <Box
      bgcolor="background.paper"
      className={`${styles.header} ${sticky ? styles.sticky : ''}`}
      {...props}
    >
      <div className={styles.leftSide}>
        <div className={styles.titleBlock}>
          {title && <div className={styles.title}>{title}</div>}
          {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
        </div>

        <div className={styles.line} />

        <div>{children}</div>
      </div>

      <div style={styles.rightSide}>{extra}</div>
    </Box>
  )
}

export default Header
