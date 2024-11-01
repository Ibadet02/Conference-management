import React from 'react'
import { StyledBackdrop } from '../../../styles/components/dashboard/mutual/Backdrop.styled'
import { BackdropProps } from '../../../types/components/dashboard/mutual/props'

const Backdrop: React.FC<BackdropProps> = ({onClick}) => {
  return (
    <StyledBackdrop onClick={onClick}></StyledBackdrop>
  )
}

export default Backdrop