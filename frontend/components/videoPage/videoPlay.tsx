import React, { FC } from 'react'

type Props = {
  videoId: string
}

export const VideoPlay: FC<Props> = ({ videoId }) => {
  return (
    <>
      <iframe
        src={videoId}
        width="560"
        height="315"
        allow="encrypted-media; autoplay"
        allowFullScreen={true}
      />

      <style jsx>{`
        iframe,
        object,
        embed,
        video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: block;
          border: none;
          animation: fadeIn 0.5s forwards;
        }
        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </>
  )
}
