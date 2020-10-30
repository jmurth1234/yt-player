import React from 'react'
import Link from 'next/link'

import styles from './Nav.module.scss'
import classNames from 'classnames'

const links = [
  { href: '/about', label: 'About' },
  { href: 'https://github.com/rymate1234/yt-player', label: 'GitHub' },
]

const Nav = ({ hidden }) => {
  return (
    <nav
      className={classNames(
        styles.nav,
        { [styles.player]: hidden },
        'fixedBar',
        'top'
      )}
    >
      <ul className={styles.left}>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
      </ul>

      <ul>
        {links.map(({ href, label }, i) => {
          const LinkComponent = () =>
            href.startsWith('http') ? (
              <a href={href} target="_blank">
                {label}
              </a>
            ) : (
              <Link href={href}>
                <a>{label}</a>
              </Link>
            )

          return (
            <li key={i}>
              <LinkComponent />
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default Nav
