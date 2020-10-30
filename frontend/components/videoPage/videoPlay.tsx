import React, { FC } from 'react'

type Props = {
  videoId: string
}

export const VideoPlay: FC<Props> = ({ videoId }) => {
  return (
    <>
      <div className="video-box">
        <iframe
          src={videoId}
          width="560"
          height="315"
          allow="encrypted-media"
          allowFullScreen={true}
        />
      </div>
      <style jsx>{`
        .video-box {
          position: relative;
          height: 270px;
          width: 480px;
          overflow: hidden;
          opacity: 0.95;
          transition: opacity 1s;
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
          display: block;
          border: none;
        }
      `}</style>
    </>
  )
}
