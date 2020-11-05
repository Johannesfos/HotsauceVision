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
            <Link href="/about">
              <a>About</a>
            </Link>
            <Link href="/dashboard">
              <a>Dashboard</a>
            </Link>
            {isSignedIn && (
              <button className="signOutBtn" onClick={logout}>
                Sign Out
              </button>
            )}
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
          margin: 0;
        }

        nav {
          background: black;
          display: flex;
          justify-content: flex-start;
          font-size: calc(0.5em + 0.5vw);
          position: sticky;
          top: 0;
          z-index: 12000;
        }

        nav a {
          color: white;
          padding: 10px 20px;
          text-decoration: none;
        }

        nav a:hover {
          background: rgba(247, 147, 30, 0.8);
          color: white;
        }

        .signOutBtn {
          outline: 0;
          border: 0;
          appearance: none;
          color: white;
          padding: 10px 20px;
          text-decoration: none;
          background: rgba(250, 157, 10, 0.5);
          color: white;
          font-size: calc(0.7em + 0.2vw);
        }

        .signOutBtn :hover {
          background: rgba(250, 157, 10, 0.8);
        }

        main {
          padding-top: 15px;
          padding-left: 50px;
          padding-right: 50px;
          padding-bottom: 70vh;
        }
        @media only screen and (max-width: 600px) {
          nav {
            background: black;
            display: flex;
            justify-content: flex-start;
            font-size: calc(1em + 0.5vw);
            position: sticky;
            top: 0;
            z-index: 12000;
          }
        }
      `}</style>
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          font-family: 'Lato', sans-serif;
          color: white;
          background: black;
          font-weight: 500;
        }
      `}</style>
    </>
  )
}
