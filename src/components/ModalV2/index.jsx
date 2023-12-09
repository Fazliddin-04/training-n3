import { forwardRef } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Slide from '@mui/material/Slide'
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material'
import styles from './styles.module.scss'
import Button from '@/components/Button'
import { useTranslation } from 'react-i18next'
import { Icon } from '@iconify/react'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function Modal({
  open,
  onClose,
  title,
  tools = null,
  mode = 'normal',
  children,
  fullScreen,
  contentsx,
  noCloseIcon,
  onConfirm,
  disabled,
  ...props
}) {
  const { t } = useTranslation()
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="custom-dialog-title"
      aria-describedby="custom-dialog-description"
      TransitionComponent={Transition}
      fullScreen={fullScreen}
      PaperProps={{
        sx: { overflowY: 'visible', bgcolor: 'background.paper' },
      }}
      {...props}
    >
      {(mode === 'delete' || title) && (
        <AppBar
          position="static"
          color="transparent"
          elevation={0}
          className={styles.app_bar}
        >
          {fullScreen ? (
            <Toolbar>
              {!noCloseIcon && (
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={onClose}
                  aria-label="close"
                >
                  <Icon icon="eva:close-outline" />
                </IconButton>
              )}
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                {title}
              </Typography>
              {tools}
            </Toolbar>
          ) : (
            <Toolbar>
              <Typography
                sx={{ flex: 1, fontSize: { xs: '1rem', md: '1.25rem' } }}
                variant="h6"
                component="div"
              >
                {title
                  ? title
                  : mode === 'delete' && t('are_you_sure_want_to_delete')}
              </Typography>
              {!noCloseIcon && mode !== 'delete' && (
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={onClose}
                  aria-label="close"
                >
                  <Icon icon="eva:close-outline" />
                </IconButton>
              )}
            </Toolbar>
          )}
        </AppBar>
      )}
      <DialogContent sx={contentsx}>
        {mode === 'delete' ? (
          <Box display="flex" gap={2}>
            <Button variant="outlined" size="large" fullWidth onClick={onClose}>
              {t('cancel')}
            </Button>
            <Button
              color="error"
              size="large"
              fullWidth
              disabled={disabled}
              onClick={onConfirm}
            >
              {t('delete')}
            </Button>
          </Box>
        ) : (
          children
        )}
      </DialogContent>
    </Dialog>
  )
}
