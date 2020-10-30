import React, { FC } from 'react'

type Props = {
  imgUrl: string
  onPlayHandler: () => void
}

export const Thumbnail: FC<Props> = ({ imgUrl, onPlayHandler }) => {
  return (
    <>
      <div className="thumbnail">
        <img className="thumbnail-img" src={imgUrl} />
        <img
          className="play-button"
          src="play-button.svg"
          onClick={onPlayHandler}
        />
      </div>
      <style jsx>{`
        .thumbnail {
          position: relative;
          height: 270px;
          overflow: hidden;
          opacity: 0.95;
          transition: opacity 1s;
        }

        .thumbnail:hover {
          opacity: 1;
        }

        .thumbnail-img {
          display: block;
          margin-top: -45px;
        }
        .play-button {
          position: absolute;
          top: 110px;
          left: 215px;
          height: 50px;
          width: 50px;
          z-index: 100;
          opacity: 0.7;
          transition: opacity 0.5s ease-out;
        }

        .play-button:hover {
          opacity: 1;
        }

        @media only screen and (max-width: 600px) {
          .thumbnail {
          height: 216px;
          width:384px;
         
        }
        .play-button {
          top: 83px;
          left: 167px;
        }
        }
        
        }
      `}</style>
    </>
  )
}
