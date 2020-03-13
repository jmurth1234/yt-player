import React from 'react'
import Link from 'next/link'
import { nav, fixedBar } from '../styles/shared'

const links = [
  { href: '/about', label: 'About' },
  { href: 'https://github.com/rymate1234/yt-player', label: 'GitHub' }
].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`
  return link
})

const Nav = ({ hidden }) => {
  const hiddenClass = hidden ? 'player' : ''
  return (
    <nav className={`fixedBar top ${hiddenClass}`}>
      <ul className="left">
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
      </ul>

      <ul>
        {links.map(({ key, href, label }) => {
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
            <li key={key}>
              <LinkComponent />
            </li>
          )
        })}
      </ul>

      <style jsx>{fixedBar}</style>
      <style jsx>{nav}</style>
    </nav>
  )
}

export default Nav
