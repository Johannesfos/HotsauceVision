import React, { useState } from 'react'
import { ImageUploader } from './imageUploader'
import { VideoUploader } from './videoUploader'
import { useMustAuthenticate } from '../utils/auth/useUser'
import { Button } from 'semantic-ui-react'

type DashboardNavOps = 'videoUploader' | 'imageUploader' | 'infoPage'

export const DashboardPage = () => {
  const { user } = useMustAuthenticate()

  const [dashboardPage, setDashboardPage] = useState<DashboardNavOps>(
    'videoUploader'
  )

  const changeDashboardNavFunction = (newPage: DashboardNavOps) => () =>
    setDashboardPage(newPage)

  if (!user) {
    return null
  }

  return (
    <>
      <div className="dashboard-wrapper">
        <div className="dashboard-navigation">
          <div className="navBtn">
            <Button
              onClick={changeDashboardNavFunction('imageUploader')}
              secondary
            >
              Add Image
            </Button>
          </div>

          <div className="navBtn">
            <Button
              onClick={changeDashboardNavFunction('videoUploader')}
              secondary
            >
              Add Video
            </Button>
          </div>
        </div>
        <div className="dashboard-pages">
          {dashboardPage === 'imageUploader' && <ImageUploader />}
          {dashboardPage === 'videoUploader' && <VideoUploader />}
        </div>
      </div>
      <style jsx>{`
        .dashboard-wrapper {
          display: flex;
          flex-direction: row;
        }

        .navBtn {
          margin-bottom: 5px;
        }

        .dashboard-navigation {
          display: flex;
          flex-direction: column;
          padding: 10px;
        }

        .dashboard-pages {
          flex: 1;
          margin: 10px;
        }
      `}</style>
    </>
  )
}
