import React from 'react'
import { LayoutProps } from '../../../types/types'
import classes from "./Card.module.scss"

type LayoutPropsExtended = LayoutProps & {
  className?: string;
}

const Card = ({ children, className }: LayoutPropsExtended) => {
  return (
    <div className={`${classes.card} ${className}`}>{children}</div>
  )
}

export default Card