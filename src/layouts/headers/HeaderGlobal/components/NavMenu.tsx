import { useLocation } from 'react-router-dom'
import NavItem from './NavItem'
import type { NavMenuProps } from '../types'
import styles from './NavMenu.module.scss'

const NavMenu = ({ items, onItemClick }: NavMenuProps) => {
  const location = useLocation()

  const isActiveRoute = (link: string) => {
    if (link === '/') return location.pathname === '/'
    return location.pathname.startsWith(link)
  }

  return (
    <ul className={styles.list}>
      {items.map((item, index) => (
        <NavItem
          key={item.id}
          item={item}
          isActive={isActiveRoute(item.link)}
          onClick={onItemClick}
          index={index}
        />
      ))}
    </ul>
  )
}

export default NavMenu
