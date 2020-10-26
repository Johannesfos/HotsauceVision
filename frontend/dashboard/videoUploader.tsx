import React, { useState } from 'react'
import VideoService from '../logic/services/video_service'
import { VideoModel } from '../logic/models/video_models'
import Loader from 'react-loader-spinner'

export const VideoUploader = () => {
  const [title, setTitle] = useState<string>()
  const [url, setUrl] = useState<string>()
  const [description, setDescription] = useState<string>()
  const [error, setError] = useState<string>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const onUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value)
  }
  const onDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value)
  }
  const onSubmit = async () => {
    //send en videoModel
    if (!title || !description || !url) {
      return setError('Something is missing.')
    }

    const videoModel: Omit<VideoModel, 'id'> = {
      description,
      title,
      url,
    }
    setIsLoading(true)
    const didSucceed = await VideoService.uploadVideo(videoModel)
    setIsLoading(false)

    if (!didSucceed) {
      setError('something went wrong! try again.')
      console.log(error)
    } else {
      setError('')
      setDescription('')
      setTitle('')
      setUrl('')
      console.log('nå skal det være tomt i alle inputs')
    }
  }

  return (
    <>
      <div className="video-upload-wrapper">
        <h1>VideoUploader</h1>
        <p>Title</p>
        <input
          type="text"
          value={title}
          placeholder="write a tasty title for you video..."
          onChange={onTitleChange}
        />
        <p>videoUrl</p>
        <input
          type="text"
          value={url}
          placeholder="Paste in youtubeLink..."
          onChange={onUrlChange}
        />
        <p>Description</p>
        <textarea
          value={description}
          placeholder="Max 500 characters..."
          maxLength={500}
          onChange={onDescriptionChange}
        />
        <div className="loaderBox">
          <Loader
            visible={isLoading}
            type="Circles"
            color="FF9A4A"
            secondaryColor="FF603D"
            height={70}
            width={70}
            timeout={0}
          />
        </div>
        <button disabled={isLoading} onClick={onSubmit}>
          Upload
        </button>
      </div>
      <style jsx>{`
        .video-upload-wrapper  {
          display: flex;
          justify-content: start;
        }
        .loaderBox {
          position: fixed;
          top: 50%;
          left: 50%;
          margin-top: -35;
          margin-left: -35;
        }
      `}</style>
    </>
  )
}
