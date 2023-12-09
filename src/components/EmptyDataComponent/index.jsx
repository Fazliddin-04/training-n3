import './style.scss'
import { experimentalStyled, Typography } from '@mui/material'
import { Icon } from '@iconify/react'

const StyledTitle = experimentalStyled(Typography)(({ theme }) => ({
  color: theme.palette.grey[500],
}))

const EmptyDataComponent = ({ title = 'No data', isVisible }) => {
  if (!isVisible) return null

  return (
    <div className="EmptyDataComponent">
      <div className="block">
        <div className="icon">
          <Icon icon="eva:list-fill" style={{ color: 'grey', fontSize: '50' }} />
        </div>
        <StyledTitle variant="body1">{title}</StyledTitle>
      </div>
    </div>
  )
}

export default EmptyDataComponent
