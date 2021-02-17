/** @jsxRuntime classic */
/** @jsx jsx */
import {Fragment} from 'react'
import {jsx, useThemeUI} from 'theme-ui'

const Button = ({primary, hover, text, action, children}) => {
  return (
    <button
      sx={{
        py: 2,
        px: 4,
        mx: 2,
        bg: `${primary.bg}`,
        color: `${primary.color}`,
        fontFamily: 'light',
        fontSize: [1, 2],
        textTransform: 'uppercase',
        letterSpacing: '2px',
        border: 'none',
        borderRadius: '2rem',
        cursor: 'pointer',
        '&:hover': {
          bg: `${hover.bg}`,
          color: `${hover.color}`,
        },
        '&:focus': {
          outline: 'none',
        },
        '@media (max-width: 40rem)': children
          ? {
              py: 1,
            }
          : {
              px: 2,
              fontSize: 0,
              letterSpacing: '0.02',
            },
      }}
      onClick={action}>
      {children ? <Fragment>{children}</Fragment> : text}
    </button>
  )
}

export default Button
