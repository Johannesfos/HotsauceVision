import React, { FC } from 'react'
import { Button } from 'semantic-ui-react'

type Props = {
  header: string
  message: string
  onClick: () => void
  btnText: string
}

export const HSVNotification: FC<Props> = ({
  header,
  message,
  onClick,
  btnText,
}) => {
  return (
    <>
      <div className="notification">
        <h1>{header}</h1>
        <p>{message}</p>
        <Button className="acknBtn" onClick={onClick}>
          {btnText}
        </Button>
      </div>
      <style jsx>{`
        .notification {
          position: fixed;
          color: white;
          background: rgba(12, 10, 120, 0.8);
          display: flex;
          border: 1px solid black;
          flex-direction: column;
          padding: 15px;
          bottom: 0;
          right: 50px;
          z-index: 2000;
          opacity: 0;
          animation: fadeIn 1s forwards;
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        h1 {
          font-weight: 500;
        }

        p {
          font-weight: 100;
        }
      `}</style>
    </>
  )
}
