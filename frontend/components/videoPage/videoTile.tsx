import React, { FC } from 'react'
import ReactPlayer from 'react-player'

type Props = {
  videoUrl: string
  tittel: string
  description: string
}

export const VideoTile: FC<Props> = ({ videoUrl, tittel, description }) => {
  return (
    <>
      <div className="video-tile">
        <h1>{tittel}</h1>
        <ReactPlayer url={videoUrl} controls={true} />
        <br />
        <div className="description">{description}</div>
      </div>

      <style jsx>{`
        .delete {
          position: absolute;
          appearance: none;
          outline: 0;
          border: 0;
          background: orange;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          color: #fff;
          top: 20px;
          right: 20px;
          padding: 5px;
          background: red;
          opacity: 0.5;
          z-index: 999;
        }

        .delete :hover {
          cursor: pointer;
          opacity: 1;
        }

        .deleted-pic {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          flex-direction: column;
          z-index: 1001;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.7);
          color: white;
        }

        .video-tile {
          margin-bottom: 10px;
          width: 640px;
          height: auto;
          padding-bottom: 50px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.7);
        }
      `}</style>
    </>
  )
}
