import React, { useState } from 'react'
import { ImageUploader } from './imageUploader'
import { VideoUploader } from './videoUploader'
import { useMustAuthenticate } from '../../utils/auth/useUser'
import { DashboardBtn } from './DashboardBtn'
import { Invoice } from './invoice'
import { Offer } from './offer'

export const DashboardPage = () => {
  const { user } = useMustAuthenticate()

  const [dashboardPage, setDashboardPage] = useState<string>('imageUploader')

  const changeDashboardNavFunction = (page: string) => {
    setDashboardPage(page)
  }

  if (!user) {
    return null
  }

  return (
    <>
      <div className="dashboard-wrapper">
        <div className="dashboard-navigation">
          <DashboardBtn
            onClickHandler={changeDashboardNavFunction}
            label="Add Image"
            page="imageUploader"
          />
          <DashboardBtn
            onClickHandler={changeDashboardNavFunction}
            label="Add Video"
            page="videoUploader"
          />
          <DashboardBtn
            onClickHandler={changeDashboardNavFunction}
            label="Invoice"
            page="invoice"
          />
          <DashboardBtn
            onClickHandler={changeDashboardNavFunction}
            label="Offer"
            page="offer"
          />
        </div>
        <div className="dashboard-pages">
          {dashboardPage === 'imageUploader' && <ImageUploader />}
          {dashboardPage === 'videoUploader' && <VideoUploader />}
          {dashboardPage === 'invoice' && <Invoice />}
          {dashboardPage === 'offer' && <Offer />}
        </div>
      </div>
      <style jsx>{`
        .dashboard-wrapper {
          display: flex;
          flex-direction: row;
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
