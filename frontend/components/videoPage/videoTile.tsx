import React, { FC, useState } from 'react'
import { VideoModel } from '../../logic/models/video_models'
import { Thumbnail } from './thumbnail'
import { VideoPlay } from './videoPlay'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Props = {
  video: VideoModel
  isSignedIn: boolean
  deleteVideoById: (id: string) => void
  playVideoClickHandler: (id: string) => void
  playId: string
}

export const VideoTile: FC<Props> = ({
  video,
  isSignedIn,
  deleteVideoById,
  playVideoClickHandler,
  playId,
}) => {
  const [onMouseOver, setOnMouseOver] = useState<Boolean>(false)
  const onPlayHandler = () => {
    playVideoClickHandler(video.id)
  }

  const deleteClickHandler = () => {
    deleteVideoById(video.id)
  }

  const onMouseEnter = () => {
    setOnMouseOver(true)
  }

  const onMouseLeave = () => {
    setOnMouseOver(false)
  }

  return (
    <>
      <div className="video-tile">
        <div
          className="video-box"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {video.id !== playId ? (
            <Thumbnail onPlayHandler={onPlayHandler} imgUrl={video.imgUrl} />
          ) : (
            <VideoPlay videoId={video.videoId} />
          )}
          {isSignedIn && (
            <button className="delete" onClick={deleteClickHandler}>
              <FontAwesomeIcon icon={faTimes} size={'2x'} />
            </button>
          )}
          {onMouseOver && <p className="description">{video.description}</p>}
        </div>
        <p className="title">{video.title}</p>
      </div>

      <style jsx>{`
        .video-tile {
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;
          align-items: center;
          margin: 40px;
          width: 480px;
        }
        .title {
          font-weight: 300;
          font-size: 30px;
          line-height: 30px;
          width: 100%;
          text-align: left;
        }

        .video-box {
          position: relative;
          height: 270px;
          width: 100%;
          overflow: hidden;
          opacity: 0.95;
        }

        .description {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          padding: 10px;
          height: auto;
          background: rgba(0, 0, 0, 0.9);
          color: white;
          z-index: 900;
          animation: fadeIn 0.8s forwards;
          pointer-events: none;
        }

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
          width: 40px;
          height: 40px;
          color: #fff;
          top: 20px;
          right: 20px;
          padding: 5px;
          background: red;
          opacity: 0.5;
          z-index: 901;
        }

        .delete :hover {
          cursor: pointer;
          opacity: 1;
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        @media only screen and (max-width: 600px) {
          .video-tile {
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            align-items: center;
            width: 100%;
            margin-bottom: 20px;
          }
          .video-box {
            position: relative;
            height: calc(90vw * 0.5625);
            width: 90vw;
          }
          .description {
            width: 90vw;
          }
        }
      `}</style>
    </>
  )
}
