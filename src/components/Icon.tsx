import * as icons from 'lucide-react'
import { LucideProps } from 'lucide-react'
import React, { createElement } from 'react'

export type IconName = Omit<
  typeof icons,
  | 'createReactComponent'
  | 'createLucideIcon'
  | 'IconNode'
  | 'LucideIcon'
  | 'LucideProps'
>

type IconProps = LucideProps & {
  name: keyof IconName
}

const Icon: React.FC<IconProps> = ({ name, ...props }) => {
  const icon = icons[name]
  if (icon) {
    return createElement(icon, props)
  }

  return null
}

export default Icon