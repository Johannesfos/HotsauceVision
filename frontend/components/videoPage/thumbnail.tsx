import React, { FC } from 'react'

type Props = {
  imgUrl: string
  onPlayHandler: () => void
}

export const Thumbnail: FC<Props> = ({ imgUrl, onPlayHandler }) => {
  return (
    <>
      <img className="thumbnail-img" src={imgUrl} />
      <img
        className="play-button"
        src="play-button.svg"
        onClick={onPlayHandler}
      />

      <style jsx>{`
        img {
          display: block;
          top: 0;
          left: 0;
          margin-top: -45px;
        }
        .play-button {
          margin: auto;
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          height: 50px;
          width: 50px;
          z-index: 100;
          opacity: 0.7;
          transition: opacity 0.5s ease-out;
        }

        .play-button:hover {
          opacity: 1;
        }
      `}</style>
    </>
  )
}
