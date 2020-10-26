import React from 'react'
import { ImageUploader } from './imageUploader'
import { VideoUploader } from './videoUploader'

export const DashboardPage = () => {
  // Kan vi veksle mellom dem?
  return (
    <div>
      <ImageUploader />
      <VideoUploader />
    </div>
  )
}
