import { memo } from 'react'
import { useTheme } from '@mui/material'

function Tag({
  children,
  icon: Icon,
  className = '',
  color = 'primary',
  disabled,
  shape = 'filled',
  size = 'medium',
  textStyle,
  borderColor,
  ...rest
}) {
  const theme = useTheme()

  const getSize = (key) => {
    switch (key) {
      case 'small':
        return {
          size: 'px-1',
          fontSize: 'text-xs',
          radius: 'rounded',
        }
      case 'medium':
        return {
          size: 'px-3',
          fontSize: 'text-md',
          radius: 'rounded-md',
        }
      case 'large':
        return {
          size: 'px-2 py-1',
          fontSize: 'text-md',
          radius: 'rounded-md',
        }

      default:
        break
    }
  }

  const getShape = (key) => {
    switch (key) {
      case 'filled':
        return {
          color: `bg-${color}-100  text-${color}-600`,
        }
      case 'outlined':
        return {
          color: `bg-transparent text-${color}-600 border  ${
            borderColor ? borderColor : `border-${color}-600"`
          }`,
        }
      case 'subtle':
        return { color: `bg-${color}-100 text-${color}-600` }

      default:
        return { color: '' }
    }
  }

  return (
    <div
      className={`
          flex
          focus:outline-none
          transition
          items-center
          justify-center
          text-white
          ${children ? '' : 'w-9 h-9'}
          focus:ring focus:border-blue-300 
          ${getSize(size).size}
          ${getSize(size).radius}
          ${disabled ? 'bg-gray-200 cursor-not-allowed' : getShape(shape).color}
          ${className}
        `}
      style={{
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
      }}
      {...rest}
    >
      <div
        className={`flex  items-center ${
          children ? 'gap-1' : ''
        } font-semibold`}
      >
        {Icon && <Icon style={{ fontSize: '18px' }} />}

        <div className={`${getSize(size).fontSize}`} style={textStyle}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default memo(Tag)
