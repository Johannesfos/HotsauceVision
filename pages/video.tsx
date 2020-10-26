import { GetStaticProps, NextPage } from 'next'
import React from 'react'
import { VideoTile } from '../frontend/components/videoPage/videoTile'
import { VideoModel } from '../frontend/logic/models/video_models'
import VideoService from '../frontend/logic/services/video_service'

type Props = {
  videos: VideoModel[]
}

export const Video: NextPage<Props> = ({ videos }) => {
  return (
    <>
      <div className="videopage">
        <h1>Create</h1>
        <p>
          Hotsaucevision is a team of friends that enjoys making videos, taking
          photos and creating memories.
        </p>
        {videos.map((video) => {
          return <VideoTile video={video} key={video.id} />
        })}
      </div>
      <style jsx>{`
        .videopage {
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
        }
      `}</style>
    </>
  )
}

export default Video

export const getStaticProps: GetStaticProps = async () => {
  const revalidateEveryXMinutes = 10
  const videos = await VideoService.getVideos()

  return { props: { videos }, revalidate: 60 * revalidateEveryXMinutes }
}
