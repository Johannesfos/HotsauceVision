import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FC, useState } from 'react'
import { ImageModel } from '../logic/image_model'

type Props = {
  image: ImageModel
  isLoggedIn: boolean
  deleteImageById: (id: string) => void
  openImage: (image: ImageModel) => void
}

export const ImageTile: FC<Props> = ({
  image,
  isLoggedIn,
  deleteImageById,
  openImage,
}) => {
  const [toBeDeleted, settoBeDeleted] = useState<boolean>(false)

  const removeImage = () => {
    deleteImageById(image.id)
    settoBeDeleted(true)
  }

  const onImageClick = () => {
    openImage(image)
  }

  return (
    <>
      <div className="image-tile">
        {isLoggedIn && (
          <button className="delete" onClick={removeImage}>
            <FontAwesomeIcon icon={faTimes} size={'2x'} />
          </button>
        )}
        <img onClick={onImageClick} src={image.path} />
        {toBeDeleted && (
          <div className="deleted-pic">
            <p>Picture is being deleted.</p>
            <p>Can take up to 10 minutes for it to not show.</p>
          </div>
        )}
      </div>
      <style jsx>{`
        .delete {
          position: absolute;
          appearance: none;
          outline: 0;
          border: 0;
          background: orange;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          color: #fff;
          top: 20px;
          right: 20px;
          padding: 5px;
          background: red;
          opacity: 0.5;
          z-index: 999;
        }

        .delete :hover {
          cursor: pointer;
          opacity: 1;
        }

        .deleted-pic {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          flex-direction: column;
          z-index: 1001;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.7);
          color: white;
        }

        .image-tile {
          position: relative;
          display: block;
          overflow: hidden;
          margin-bottom: 10px;
        }

        .image-tile img {
          width: 100% !important;
          height: auto !important;
          opacity: 0.85;
          transform: scale(1);
          transition: all 0.3s ease-in-out;
        }

        .image-tile img:hover {
          opacity: 1;
          transform: scale(1.05);
        }
      `}</style>
    </>
  )
}
