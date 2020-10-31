import { GetStaticProps, NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { VideoTile } from '../frontend/components/videoPage/videoTile'
import { VideoModel } from '../frontend/logic/models/video_models'
import VideoService from '../frontend/logic/services/video_service'
import { useUser } from '../frontend/utils/auth/useUser'

type Props = {
  videos: VideoModel[]
}

export const Video: NextPage<Props> = ({ videos }) => {
  //if logged in, possibility to delete videos
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
  const [allVideos, setAllVideos] = useState<VideoModel[]>(videos)
  const [videoPlayingId, setVideoPlaying] = useState<string>('')

  const user = useUser()

  const playVideoClicked = (id: string) => {
    setVideoPlaying(id)
  }

  const deleteVideoById = async (id: string) => {
    const newVideos = allVideos.filter((video) => {
      return video.id !== id
    })
    setAllVideos(newVideos)
    if (user) {
      VideoService.deleteVideo(id)
    } else {
      console.error('user not signed in')
    }
  }

  useEffect(() => {
    if (user) {
      setIsSignedIn(true)
    } else {
      setIsSignedIn(false)
    }
  })

  return (
    <>
      <div className="videopage">
        <h1>Create</h1>
        <p>
          Hotsaucevision is a team of friends that enjoys making videos, taking
          photos and creating memories.
        </p>
      </div>
      <div className="video-tiles">
        {allVideos.map((video) => {
          return (
            <VideoTile
              deleteVideoById={deleteVideoById}
              playVideoClickHandler={playVideoClicked}
              isSignedIn={isSignedIn}
              playId={videoPlayingId}
              video={video}
              key={video.id}
            />
          )
        })}
      </div>
      <style jsx>{`
        .videopage {
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
        }
        .video-tiles {
          display: flex;
          flex-wrap: wrap;
          margin-top: 50px;
          flex-direction: row;
          justify-content: space-evenly;
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
