import React, { FC } from 'react'
import Link from 'next/link'
import { Header } from './header'
import { useUser, useUserMethods } from '../../utils/auth/useUser'
import { Footer } from './footer'

export const Layout: FC = ({ children }) => {
  const user = useUser()
  const { logout } = useUserMethods()

  const isSignedIn = user ? true : false

  return (
    <>
      <div id="website">
        <div id="web">
          <Header />
          <nav>
            <Link href="/">
              <a>Home</a>
            </Link>

            <Link prefetch href="/images">
              <a>Photo</a>
            </Link>
            <Link prefetch href="/video">
              <a>Video</a>
            </Link>
            <Link href="/dashboard">
              <a>Dashboard</a>
            </Link>
            {isSignedIn && <button onClick={logout}>Sign Out</button>}
          </nav>
          <main>{children}</main>
          <Footer />
        </div>
      </div>
      <style jsx>{`
        #website {
          display: flex;
          width: 100%;
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;
        }

        nav {
          background: rgb(10, 35, 55);
          display: flex;
          justify-content: flex-start;
        }

        nav a {
          color: white;
          padding: 20px 30px;
          text-decoration: none;
          font-family: 'Tahoma';
        }

        nav a:hover {
          background: orange;
          opacity: 0.8;
          color: white;
        }

        main {
          flex-wrap: wrap;
          padding-top: 15px;
          padding-left: 50px;
          padding-right: 50px;
          padding-bottom: 70vh;
          font-family: 'tahoma';
        }

        footer {
          background: rgb(10, 35, 55);
          height: 30vh;
        }
      `}</style>
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
        }
      `}</style>
    </>
  )
}
