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
  const hiddenClass = hidden ? 'offscreen' : ''
  return (
    <nav className={`fixedBar top ${hiddenClass}`}>
      <ul className="left">
        <li>
          <Link prefetch href="/">
            <a>Home</a>
          </Link>
        </li>
      </ul>

      <ul>
        {links.map(({ key, href, label }) => (
          <li key={key}>
            <Link href={href}>
              <a>{label}</a>
            </Link>
          </li>
        ))}
      </ul>

      <style jsx>{fixedBar}</style>
      <style jsx>{nav}</style>
    </nav>
  )
}

export default Nav
