import React, { FC, useState } from 'react'
import { Button } from 'semantic-ui-react'
import { VideoModel } from '../../logic/models/video_models'
import { Thumbnail } from './thumbnail'
import { VideoPlay } from './videoPlay'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Props = {
  video: VideoModel
  isSignedIn: boolean
  deleteVideoById: (id: string) => void
}

export const VideoTile: FC<Props> = ({
  video,
  isSignedIn,
  deleteVideoById,
}) => {
  const [onPlay, setOnPlay] = useState<Boolean>(false)
  const [onReadMore, setOnReadMore] = useState<Boolean>(false)
  const onPlayHandler = () => {
    setOnPlay(!onPlay)
  }

  const onReadMoreClick = () => {
    setOnReadMore(!onReadMore)
  }
  const deleteClickHandler = () => {
    deleteVideoById(video.id)
  }

  return (
    <>
      <div className="video-tile">
        <div className="video-box">
          {!onPlay ? (
            <Thumbnail onPlayHandler={onPlayHandler} imgUrl={video.imgUrl} />
          ) : (
            <VideoPlay videoId={video.videoId} />
          )}
          {isSignedIn && (
            <button className="delete" onClick={deleteClickHandler}>
              <FontAwesomeIcon icon={faTimes} size={'2x'} />
            </button>
          )}
        </div>
        <p className="title">{video.title}</p>
        {!onReadMore ? (
          <Button icon="angle down" size="mini" onClick={onReadMoreClick} />
        ) : (
          <Button icon="angle up" size="mini" onClick={onReadMoreClick} />
        )}
        <div className="description-wrap">
          {onReadMore && <p className="description">{video.description}</p>}
        </div>
      </div>

      <style jsx>{`
        .video-tile {
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;
          align-items: center;
          width: 500px;
          margin-bottom: 20px;
        }
        .title {
          font-weight: 300;
          font-size: 30px;
          line-height: 30px;
        }

        .video-box {
          position: relative;
        }

        .description-wrap {
          position: relative;
          margin: 2px;
        }

        .description {
          position: absolute;
          left: -240px;
          top: 0;
          width: 480px;
          padding: 10px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.3);
          text-align: center;
          height: auto;
          background: white;
          z-index: 3000;
          animation: fadeIn 0.8s forwards;
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
          z-index: 900;
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
      `}</style>
    </>
  )
}
