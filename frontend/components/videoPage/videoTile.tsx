import React, { FC } from 'react'

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
        <div className="video-box">
          <iframe
            src={videoUrl}
            width="560"
            height="315"
            allow="autoplay; encrypted-media"
          />
        </div>
        <br />
        <div className="description">{description}</div>
      </div>

      <style jsx>{`
        .video-box {
          position: relative;
          padding-bottom: 56.25%;
          padding-top: 30px;
          height: 0;
          overflow: hidden;
        }
        .video-box iframe,
        .video-box object,
        .video-box embed,
        .video-box video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .video-tile {
          margin-bottom: 10px;
          width: 80vw;
          height: auto;
          padding-bottom: 50px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.7);
        }
      `}</style>
    </>
  )
}
