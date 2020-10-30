import React, { FC } from 'react'
import { Button } from 'semantic-ui-react'

type DashboardNavOps =
  | 'videoUploader'
  | 'imageUploader'
  | 'infoPage'
  | 'invoice'
  | 'offer'

type Props = {
  page: DashboardNavOps
  onClickHandler: (page: DashboardNavOps) => void
  label: string
}

export const DashboardBtn: FC<Props> = ({ page, onClickHandler, label }) => {
  const btnOnClickHandler = () => {
    onClickHandler(page)
  }

  return (
    <>
      <Button onClick={btnOnClickHandler} secondary>
        {label}
      </Button>
      <div className="navBtnMargin" />

      <style jsx>{`
        .navBtnMargin {
          height: 5px;
        }
      `}</style>
    </>
  )
}
