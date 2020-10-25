import React from 'react'
import { VideoTile } from '../frontend/components/videoPage/videoTile'

export const Video = () => {
  return (
    <>
      <div className="videopage">
        <h1>Create</h1>
        <p>
          Hotsaucevision is a team of friends that enjoys making videos, taking
          photos and creating memories.
        </p>
        <VideoTile
          videoUrl="https://www.youtube.com/embed/SS-hCZFB3Ps"
          description="This video is from Moillrocks live concert at Young, Oslo 7. februar 2020. It was such an awsome night!"
          tittel="Moillrock live Youngs"
        />
        <VideoTile
          videoUrl="https://www.youtube.com/embed/9qMe8OsrwxE"
          description="Music video from Moillrocks song Periferi - featuring Inge Bremnes"
          tittel="Moillrock ft. Inge Bremnes - Periferi"
        />
      </div>
      <style jsx>{`
        .videopage {
          display: flex;
          justify-content: center;
          flex-direction: column;
          width: 700px;
        }
      `}</style>
    </>
  )
}
export default Video
