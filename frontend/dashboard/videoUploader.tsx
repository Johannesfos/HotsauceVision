import React, { useState } from 'react'
import VideoService from '../logic/services/video_service'
import { VideoModel } from '../logic/models/video_models'
import Loader from 'react-loader-spinner'
import { HSVInput } from '../components/common/HSVInput'
import { Button } from 'semantic-ui-react'

export const VideoUploader = () => {
  const [title, setTitle] = useState<string>()
  const [url, setUrl] = useState<string>()
  const [description, setDescription] = useState<string>()
  const [error, setError] = useState<string>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

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
        <h1>Video Uploader</h1>
        <HSVInput label="Title" value={title} onChange={setTitle} />
        <HSVInput label="Video url" value={url} onChange={setUrl} />
        <HSVInput
          label="Description"
          value={description}
          onChange={setDescription}
          textarea={true}
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
        <br />
        <Button primary disabled={isLoading} onClick={onSubmit}>
          Upload
        </Button>
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
