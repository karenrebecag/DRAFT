export interface NavItemData {
  id: number
  title: string
  link: string
}

export interface HeaderProps {
  className?: string
}

export interface NavMenuProps {
  items: NavItemData[]
  onItemClick?: () => void
  activeRoute?: string
}

export interface NavItemProps {
  item: NavItemData
  isActive?: boolean
  onClick?: () => void
  index?: number
}

export interface MenuToggleProps {
  isOpen: boolean
  onToggle: () => void
  label?: string
}

export interface LogoProps {
  onClick?: () => void
  className?: string
}

export interface LanguageSelectorProps {
  label?: string
  className?: string
}

export interface SocialLinksProps {
  label?: string
  className?: string
}

export interface ContactBannerProps {
  text: string
  link: string
  onClick?: () => void
}
