import React from 'react'

export const Header = () => {
  return (
    <>
      <header>
        <div id="video-container">
          <video autoPlay muted loop>
            <source src="backvideo.mp4" type="video/mp4" />
          </video>
        </div>

        <div id="logo">
          <img src="logo_header.svg" />
        </div>
      </header>
      <style jsx>{`
        header {
          background: #fff;
          position: relative;
          overflow: hidden;
          width: 100%;
          padding-top: calc(9 / 50 * 100%);
        }

        #logo {
          position: absolute;
          bottom: 30px;
          left: 30px;
          color: white;
          z-index: 999;
          width: 30vw;
          height: auto;
        }

        #video-container {
          position: absolute;
          top: -20%;
          left: 0;
          right: 0;
          bottom: 0;
        }

        video {
          display: block;
          width: 100%;
          opacity: 0.9;
        }
      `}</style>
    </>
  )
}
